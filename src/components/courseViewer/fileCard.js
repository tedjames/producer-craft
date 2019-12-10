import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { toggleEditFileModal } from '../../actions';

const Container = styled.div`
  display: flex;
  height: 60px;
  margin-top: 10px;
  margin-right: 10px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 12.5px;
  padding-right: 17.5px;
  background: #fff;
  border-radius: 12px;
  background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23bcb4c7' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
  cursor: pointer;
  box-shadow: 2px 2px 66px -35px rgba(0, 0, 0, 0.39);
  :hover {
    opacity: 0.85;
  }
  :active {
    opacity: 0.7;
  }
`;

const FileIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border: 1px #eee dotted;
  border-radius: 80px;
  height: 40px;
  width: 40px;
  margin-right: 12.5px;
`;
const FileName = styled.div`
  font-family: roboto-condensed;
  font-weight: 400;
  font-size: 12px;
  color: #222;
  text-align: left;
`;

class FileCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: false,
    };
  }

  handleDownloadError(error) {
    switch (error.code) {
      case 'storage/object-not-found':
        // File doesn't exist
        console.log('ERROR: File does not exist', error);
        break;

      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        console.log('ERROR: User does not have permission to access the object', error);
        break;

      case 'storage/canceled':
        // User canceled the upload
        console.log('ERROR: User canceled the upload', error);
        break;

      case 'storage/unknown':
        // Unknown error occurred, inspect the server response
        console.log('ERROR: Unknown error occurred, inspect the server response', error);
        break;
      default:
        console.log('ERROR: ', error);
    }
  }

  // fetchDownloadUrl() {
  //   // Create a reference to the file we want to download
  //   const { path } = this.props;
  //   const fileRef = storage.child(`lessonFiles/${path}`);

  //   // Get the download URL
  //   fileRef
  //     .getDownloadURL()
  //     .then(url => {
  //       // Insert url into an <img> tag to "download"
  //       console.log('Fetched download url for file: ', url);
  //       this.setState({ url });
  //     })
  //     .catch(error => {
  //       // A full list of error codes is available at
  //       // https://firebase.google.com/docs/storage/web/handle-errors
  //       this.handleDownloadError(error);
  //     });
  // }

  render() {
    const { toggleEditFileModal, fileName, user, lessonId, fileId, path } = this.props;
    // const { url } = this.state;
    const isAdmin = user && user.roles ? user.roles.includes('admin') : false;
    return (
      <Container
        onClick={() => (isAdmin ? toggleEditFileModal({ lessonId, fileName, fileId, path }) : null)}
      >
        <FileIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#37d6ff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-link"
          >
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
          </svg>
        </FileIcon>
        <FileName className="disable-selection">{fileName}</FileName>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(
  mapStateToProps,
  { toggleEditFileModal },
)(FileCard);
