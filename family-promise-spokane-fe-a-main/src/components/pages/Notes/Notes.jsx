import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import LoadingComponent from '../../common/LoadingComponent';
import { axiosWithAuth } from '../../../api/axiosWithAuth';
import { Card, Input, Button, Switch } from 'antd';
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import CaseNote from '../../modals/CaseNote';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const Notes = () => {
  const [formValues, setFormValues] = useState({});
  const [creatingNote, setCreatingNote] = useState(false);
  const [checked, setChecked] = useState(false);
  const params = useParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({});
  const user = useSelector(state => state.CURRENT_USER);

  const handleFinish = e => {
    let shareable;
    if (!checked) shareable = true;
    else shareable = false;

    e.preventDefault();
    const newNote = {
      subject: formValues.subject,
      content: formValues.content,
      shareable: shareable,
      family_id: params.family_id,
      author_id: user.id,
    };

    setCreatingNote(true);

    axiosWithAuth()
      .post(`/notes`, newNote)
      .then(res => {
        setNotes([...notes, res.data.note]);
        setFormValues({});
      })
      .catch(error => {
        console.log(error.response);
        alert('Unable to create note');
      })
      .finally(() => {
        setCreatingNote(false);
      });
  };
  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const toggleChecked = checked => {
    setChecked(checked);
  };
  const toggleCaseModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const fetchNotes = async family_id => {
    setLoading(true);
    try {
      let notesData = await axiosWithAuth()
        .get(`/families/${params.family_id}/notes`)
        .then(res => res.data);
      setNotes(notesData);
    } catch (error) {
      alert('Error');
      console.log(error.response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="guest-table-container">
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className="notes-page-container">
      {isModalOpen && user.role !== 'guest' && (
        <CaseNote
          setNotes={setNotes}
          setCurrentNote={setCurrentNote}
          note={currentNote}
          toggleModal={toggleCaseModal}
        />
      )}
      <ArrowLeftOutlined
        style={{ fontSize: '30px' }}
        className="notes-page-back"
        onClick={() => history.goBack()}
      />

      {notes.map(note => {
        return (
          <Card
            extra={
              <p
                onClick={() => {
                  setCurrentNote(note);
                  toggleCaseModal();
                }}
              >
                {user.role !== 'guest' && 'more'}
              </p>
            }
            actions={[
              <p style={{ textAlign: 'left', paddingLeft: '25px' }}>
                Comments
              </p>,
            ]}
            style={{ width: '60%' }}
            title={note.subject}
          >
            {note.content.slice(0, 100) + '...'}
          </Card>
        );
      })}
      <hr />
      {user.role !== 'guest' && (
        <form className="notes-form" onSubmit={handleFinish}>
          <div className="case-notes-switch">
            <Switch
              onChange={toggleChecked}
              checkedChildren="Private"
              unCheckedChildren="Public"
            ></Switch>
          </div>
          <Input
            name="subject"
            onChange={handleChange}
            value={formValues.subject}
            size="large"
            placeholder="Subject"
          />
          <TextArea
            name="content"
            onChange={handleChange}
            value={formValues.content}
            showCount
            maxLength="256"
            placeholder="Content"
            autoSize={{ minRows: 4, maxRows: 10 }}
          ></TextArea>
          <Button disabled={creatingNote} htmlType="submit">
            {creatingNote ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default Notes;
