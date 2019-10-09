import React, { useState } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import styled, { keyframes } from 'styled-components';
import { RemoveScroll } from 'react-remove-scroll';
import Swal from 'sweetalert2';

import { toggleEditLessonModal, updateLesson, deleteLesson } from '../../../actions';
import ButtonText from '../buttonText';
import FlatButton from '../flatButton';

const FADE_IN_DURATION = '0.45s';

const fadeIn = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`;

const Container = styled.div`
  animation: ${fadeIn} ${FADE_IN_DURATION} ease;
  background-color: '#fff';
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media (max-width: 480px) {
    margin-top: 40px;
  }
`;

const SectionTitle = styled.p`
  font-family: neue-haas-grotesk-text, sans-serif;
  font-weight: 700;
  font-style: black;
  font-size: 32px;
  text-align: left;
  opacity: 0.25;
  margin-top: 60px;
  margin-bottom: 15px;
  color: #111;
  cursor: default;
`;

const AccountInfoRow = styled.div`
  display: flex;
  @media (max-width: 480px) {
    display: none;
  }
`;

const MobileAccountInfoRow = styled.div`
  display: none;
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    width: 80vw;
  }
`;

const EditLessonModal = ({
  open,
  toggleEditLessonModal,
  selectedLesson,
  updateLesson,
  deleteLesson,
}) => {
  const [lessonName, setLessonName] = useState(selectedLesson ? selectedLesson.lessonName : '');
  const [lessonNumber, setLessonNumber] = useState(
    selectedLesson ? selectedLesson.lessonNumber : '',
  );
  const [mediaId, setMediaId] = useState(selectedLesson ? selectedLesson.mediaId : '');
  const [description, setDescription] = useState(selectedLesson ? selectedLesson.description : '');
  const [trailerImage, setTrailerImage] = useState(
    selectedLesson ? selectedLesson.trailerImage : '',
  );
  const [thumbnailImage, setThumbnailImage] = useState(
    selectedLesson ? selectedLesson.thumbnailImage : '',
  );

  if (open && !lessonNumber) {
    setLessonName(selectedLesson.lessonName);
    setLessonNumber(selectedLesson.lessonNumber);
    setMediaId(selectedLesson.mediaId);
    setDescription(selectedLesson.description);
    setTrailerImage(selectedLesson.trailerImage);
    setThumbnailImage(selectedLesson.thumbnailImage);
  }

  const handleSubmit = () => {
    updateLesson({
      lessonId: selectedLesson.lessonId,
      lessonName,
      lessonNumber,
      description,
      mediaId,
      thumbnailImage,
      trailerImage,
    });
  };
  const handleDelete = () => {
    Swal.fire({
      title: 'Delete Lesson',
      text: 'Are you sure you want to delete this lesson?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(() => {
      deleteLesson({ lessonId: selectedLesson.lessonId });
    });
  };
  return (
    <Dialog
      open={open}
      onClose={() => toggleEditLessonModal(false)}
      aria-labelledby="form-dialog-title"
      fullScreen
    >
      <DialogContent style={{ margin: 0, padding: 0 }}>
        <Container>
          <SectionTitle>Edit Lesson</SectionTitle>
          <AccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={lessonName}
              onChange={e => setLessonName(e.target.value)}
              margin="dense"
              id="lesson-name"
              label="Lesson Name"
              type="name"
              placeholder="Introduction to..."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={lessonNumber}
              onChange={e => setLessonNumber(e.target.value)}
              margin="dense"
              id="lesson-number"
              label="Lesson #"
              type="text"
              placeholder="1"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccountInfoRow>
          <AccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={description}
              onChange={e => setDescription(e.target.value)}
              margin="dense"
              id="lesson-description"
              label="Description"
              type="text"
              placeholder="Learn the basics of..."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={mediaId}
              onChange={e => setMediaId(e.target.value)}
              margin="dense"
              id="media-id"
              label="Media ID"
              type="name"
              placeholder="b8j82a"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccountInfoRow>
          <AccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={thumbnailImage}
              onChange={e => setThumbnailImage(e.target.value)}
              margin="dense"
              id="trailer-image-url"
              label="Thumbnail Image URL"
              type="text"
              placeholder="https://imgur.com/lhf87as"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={trailerImage}
              onChange={e => setTrailerImage(e.target.value)}
              margin="dense"
              id="trailer-image-url"
              label="Trailer Image URL"
              type="text"
              placeholder="https://imgur.com/a81hla"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccountInfoRow>
          {/* NOTE: Mobile Responsive - Account Info Field */}
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={lessonName}
              onChange={e => setLessonName(e.target.value)}
              margin="dense"
              id="lesson-name"
              label="Lesson Name"
              type="name"
              placeholder="Introduction to..."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={lessonNumber}
              onChange={e => setLessonNumber(e.target.value)}
              margin="dense"
              id="lesson-number"
              label="Lesson #"
              type="text"
              placeholder="1"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={description}
              onChange={e => setDescription(e.target.value)}
              margin="dense"
              id="lesson-description"
              label="Description"
              type="text"
              placeholder="Learn the basics of..."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={mediaId}
              onChange={e => setMediaId(e.target.value)}
              margin="dense"
              id="media-id"
              label="Media ID"
              type="name"
              placeholder="b8j82a"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={thumbnailImage}
              onChange={e => setThumbnailImage(e.target.value)}
              margin="dense"
              id="trailer-image-url"
              label="Thumbnail Image URL"
              type="text"
              placeholder="https://imgur.com/lhf87as"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={trailerImage}
              onChange={e => setTrailerImage(e.target.value)}
              margin="dense"
              id="trailer-image-url"
              label="Trailer Image URL"
              type="text"
              placeholder="https://imgur.com/a81hla"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>
          <FlatButton
            onClick={handleSubmit}
            style={{
              width: 260,
              minHeight: 45,
              display: 'flex',
              alignItems: 'cemter',
              justifyContent: 'center',
              marginTop: 5,
              marginBottom: 10,
            }}
          >
            <ButtonText>SUBMIT CHANGES</ButtonText>
          </FlatButton>
          <FlatButton
            onClick={() => toggleEditLessonModal(false)}
            style={{
              width: 260,
              marginTop: 0,
              marginBottom: 20,
              background: '#ddd',
              minHeight: 45,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ButtonText style={{ color: '#555' }}>CANCEL</ButtonText>
          </FlatButton>
          <ButtonText onClick={handleDelete} style={{ color: 'rgb(204, 204, 204)' }}>
            DELETE LESSON
          </ButtonText>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = ({ view }) => ({
  open: view.showEditLessonModal,
  selectedLesson: view.selectedLesson,
});

export default connect(
  mapStateToProps,
  { toggleEditLessonModal, updateLesson, deleteLesson },
)(EditLessonModal);
