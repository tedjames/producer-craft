import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import styled, { keyframes } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

import { toggleEditFileModal, deleteFile, updateFile } from '../../../actions';
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

const EditFileModal = ({
  showEditFileModal,
  toggleEditFileModal,
  deleteFile,
  updateFile,
  lessonId,
}) => {
  const [fileName, setFileName] = useState('');
  const { fileId, path } = showEditFileModal;

  const handleDelete = () => {
    Swal.fire({
      title: 'Delete File',
      text: 'Are you sure you want to delete this file?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.value) {
        return deleteFile({ fileName: showEditFileModal.fileName, fileId, path, lessonId });
      }
      return toggleEditFileModal(false);
    });
  };

  const handleUpdate = () => {
    if (fileName === '') {
      return Swal.fire({
        customClass: {
          container: 'my-swal',
        },
        title: 'Unable to Update File',
        text: 'Make sure to include a name for the file.',
        type: 'error',
        confirmButtonText: 'Okay',
        timer: 8000,
      });
    }
    return updateFile({
      fileName,
      fileId,
      path,
      lessonId,
      oldFileName: showEditFileModal.fileName,
    });
  };

  const onDrop = useCallback(files => {
    // Do something with the files
    console.log('Files dropped: ', files);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Dialog
      open={!!showEditFileModal}
      onClose={() => toggleEditFileModal(false)}
      aria-labelledby="form-dialog-title"
      fullScreen
    >
      <DialogContent style={{ margin: 0, padding: 0 }}>
        <Container>
          <SectionTitle>Edit File</SectionTitle>
          <TextField
            style={{ marginBottom: 12.5, marginRight: 10 }}
            // onChange={e => usernameChanged(e.target.value)}
            //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
            value={fileName}
            onChange={e => setFileName(e.target.value)}
            margin="dense"
            id="file-name"
            label="File Name"
            type="name"
            placeholder={showEditFileModal.fileName || ''}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Click here to upload file</p>}
          </div>
          <FlatButton
            onClick={handleUpdate}
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
            onClick={() => toggleEditFileModal(false)}
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
            DELETE FILE
          </ButtonText>
        </Container>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = ({ view }) => ({
  showEditFileModal: view.showEditFileModal,
  lessonId: view.selectedLesson.lessonId,
});

export default connect(
  mapStateToProps,
  { toggleEditFileModal, deleteFile, updateFile },
)(EditFileModal);
