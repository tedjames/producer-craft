import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import styled, { keyframes } from 'styled-components';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

import { toggleAddFileModal, createFile } from '../../../actions';
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

const AddFileModal = ({ open, toggleAddFileModal, createFile, lessonId }) => {
  const [fileName, setFileName] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    console.log('File dropped: ', acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = () => {
    toggleAddFileModal(false);
    if (!fileName || fileName === '') {
      return Swal.fire({
        customClass: {
          container: 'my-swal',
        },
        title: 'Unable to Create File',
        text: 'Make sure to include a name for the file.',
        type: 'error',
        confirmButtonText: 'Okay',
        timer: 8000,
      });
    }
    return createFile({ fileName, lessonId, path: 'UNDEFINED_PATH' });
  };

  return (
    <Dialog
      open={open}
      onClose={() => toggleAddFileModal(false)}
      aria-labelledby="form-dialog-title"
      fullScreen
    >
      <DialogContent style={{ margin: 0, padding: 0 }}>
        <Container>
          <SectionTitle>Add New File</SectionTitle>
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
            placeholder="File Name"
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
            <ButtonText>CREATE FILE</ButtonText>
          </FlatButton>
          <FlatButton
            onClick={() => toggleAddFileModal(false)}
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
        </Container>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = ({ view }) => ({
  open: view.showAddFileModal,
  lessonId: view.selectedLesson.lessonId,
});

export default connect(
  mapStateToProps,
  { toggleAddFileModal, createFile },
)(AddFileModal);
