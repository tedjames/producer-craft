import React, { useState } from 'react';
import { connect } from 'react-redux';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import styled, { keyframes } from 'styled-components';

import { toggleAddCourseModal, createCourse } from '../../../actions';
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

const AddCourseModal = ({ open, toggleAddCourseModal, createCourse }) => {
  const [courseName, setCourseName] = useState('');
  const [courseNumber, setCourseNumber] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [price, setPrice] = useState('');
  const [productId, setProductId] = useState('');
  const [urlSlug, setSlug] = useState('');
  const [tagline, setTagline] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [bioImage, setBioImage] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [thumbnailImage, setThumbnailImage] = useState('');
  const [bioTitle, setBioTitle] = useState('');
  const [bioDescription, setBioDescription] = useState('');
  const [readMoreUrl, setReadMoreUrl] = useState('');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [redditUrl, setRedditUrl] = useState('');
  const [valuePropTitle, setValuePropTitle] = useState('');
  const [valuePropTitle2, setValuePropTitle2] = useState('');
  const [valuePropTitle3, setValuePropTitle3] = useState('');
  const [valuePropDescription, setValuePropDescription] = useState('');
  const [valuePropDescription2, setValuePropDescription2] = useState('');
  const [valuePropDescription3, setValuePropDescription3] = useState('');

  const handleSubmit = () => {
    createCourse({
      courseName,
      courseNumber,
      instructorName,
      price,
      productId,
      urlSlug,
      tagline,
      coverImage,
      trailerUrl,
      thumbnailImage,
      bioImage,
      bioTitle,
      bioDescription,
      readMoreUrl,
      twitterUrl,
      facebookUrl,
      redditUrl,
      valuePropTitle,
      valuePropTitle2,
      valuePropTitle3,
      valuePropDescription,
      valuePropDescription2,
      valuePropDescription3,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={() => toggleAddCourseModal(false)}
      aria-labelledby="form-dialog-title"
      fullScreen
    >
      <DialogContent style={{ margin: 0, padding: 0 }}>
        <Container>
          <SectionTitle>Add New Course</SectionTitle>
          <TextField
            style={{ marginBottom: 12.5 }}
            // onChange={e => usernameChanged(e.target.value)}
            //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
            value={courseNumber}
            onChange={e => setCourseNumber(e.target.value)}
            margin="dense"
            id="course-number"
            label="Course Number"
            type="name"
            placeholder="Course Number"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <AccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
              margin="dense"
              id="course-name"
              label="Course Name"
              type="name"
              placeholder="Course Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={instructorName}
              onChange={e => setInstructorName(e.target.value)}
              margin="dense"
              id="instructor-name"
              label="Instructor Name"
              type="name"
              placeholder="Instructor Name"
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
              value={price}
              onChange={e => setPrice(e.target.value)}
              margin="dense"
              id="course-price"
              label="Price"
              type="amount"
              placeholder="44.95"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={productId}
              onChange={e => setProductId(e.target.value)}
              margin="dense"
              id="product-id"
              label="Product ID"
              type="text"
              placeholder="prod_B6F59AF2x2D"
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
              value={urlSlug}
              onChange={e => setSlug(e.target.value)}
              margin="dense"
              id="course-slug"
              label="URL Slug"
              type="text"
              placeholder="course-name-slug"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              margin="dense"
              id="course-tagline"
              label="Course Tagline"
              type="text"
              placeholder="Teaches Music Production"
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
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              margin="dense"
              id="cover-image"
              label="Cover Image URL"
              type="text"
              placeholder="Cover"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={trailerUrl}
              onChange={e => setTrailerUrl(e.target.value)}
              margin="dense"
              id="trailer-url"
              label="Trailer URL"
              type="text"
              placeholder="https://jwplayer.com/jd72hasd"
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
              id="thumbnail-image-url"
              label="Thumbnail Image URL"
              type="text"
              placeholder="https://imgur.com/as8h92b"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={bioImage}
              onChange={e => setBioImage(e.target.value)}
              margin="dense"
              id="bio-image-url"
              label="Bio Image URL"
              type="text"
              placeholder="https://imgur.com/as8h92b"
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
              value={bioTitle}
              onChange={e => setBioTitle(e.target.value)}
              margin="dense"
              id="bio-title"
              label="Bio Title"
              type="text"
              placeholder="Experience the Legend"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={bioDescription}
              onChange={e => setBioDescription(e.target.value)}
              margin="dense"
              id="bio-description"
              label="Bio Description"
              type="text"
              placeholder="https://imgur.com/as8h92b"
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
              value={readMoreUrl}
              onChange={e => setReadMoreUrl(e.target.value)}
              margin="dense"
              id="read-more-url"
              label="Read More URL"
              type="text"
              placeholder="https://genius.com/as8h92b"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={twitterUrl}
              onChange={e => setTwitterUrl(e.target.value)}
              margin="dense"
              id="twitter-lesson-url"
              label="Twitter URL"
              type="text"
              placeholder="https://twitter.com/as8h92b"
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
              value={facebookUrl}
              onChange={e => setFacebookUrl(e.target.value)}
              margin="dense"
              id="facebook-lesson-url"
              label="Facebook URL"
              type="text"
              placeholder="https://facebook.com/course-name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={redditUrl}
              onChange={e => setRedditUrl(e.target.value)}
              margin="dense"
              id="reddit-lesson-url"
              label="Reddit URL"
              type="text"
              placeholder="https://reddit.com/course-name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccountInfoRow>
          {/* Value Propositions */}
          <AccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={valuePropTitle}
              onChange={e => setValuePropTitle(e.target.value)}
              margin="dense"
              id="value-prop-title"
              label="Value Prop Title"
              type="text"
              placeholder="22 Lessons"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={valuePropDescription}
              onChange={e => setValuePropDescription(e.target.value)}
              margin="dense"
              id="value-prop-description"
              label="Value Prop Description"
              type="text"
              placeholder="Exclusive acccess to..."
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
              value={valuePropTitle2}
              onChange={e => setValuePropTitle2(e.target.value)}
              margin="dense"
              id="value-prop-title-2"
              label="Value Prop Title 2"
              type="text"
              placeholder="Sample Pack"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={valuePropDescription2}
              onChange={e => setValuePropDescription2(e.target.value)}
              margin="dense"
              id="value-prop-description-2"
              label="Value Prop Description 2"
              type="text"
              placeholder="Over 24 samples..."
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
              value={valuePropTitle3}
              onChange={e => setValuePropTitle3(e.target.value)}
              margin="dense"
              id="value-prop-title-3"
              label="Value Prop Title 3"
              type="text"
              placeholder="Competition"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={valuePropDescription3}
              onChange={e => setValuePropDescription3(e.target.value)}
              margin="dense"
              id="value-prop-description-3"
              label="Value Prop Description 3"
              type="text"
              placeholder="Share your musical works..."
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </AccountInfoRow>

          {/* NOTE: Mobile Responsive - Account Info Field */}
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={courseName}
              onChange={e => setCourseName(e.target.value)}
              margin="dense"
              id="course-name"
              label="Course Name"
              type="name"
              placeholder="Course Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={instructorName}
              onChange={e => setInstructorName(e.target.value)}
              margin="dense"
              id="instructor-name"
              label="Instructor Name"
              type="name"
              placeholder="Instructor Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={price}
              onChange={e => setPrice(e.target.value)}
              margin="dense"
              id="course-price"
              label="Price"
              type="amount"
              placeholder="44.95"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={productId}
              onChange={e => setProductId(e.target.value)}
              margin="dense"
              id="product-id"
              label="Product ID"
              type="text"
              placeholder="prod_B6F59AF2x2D"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={urlSlug}
              onChange={e => setSlug(e.target.value)}
              margin="dense"
              id="course-slug"
              label="URL Slug"
              type="text"
              placeholder="course-name-slug"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              margin="dense"
              id="course-tagline"
              label="Course Tagline"
              type="text"
              placeholder="Teaches Music Production"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={coverImage}
              onChange={e => setCoverImage(e.target.value)}
              margin="dense"
              id="cover-image"
              label="Cover Image URL"
              type="text"
              placeholder="Cover"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={trailerUrl}
              onChange={e => setTrailerUrl(e.target.value)}
              margin="dense"
              id="trailer-url"
              label="Trailer URL"
              type="text"
              placeholder="https://jwplayer.com/jd72hasd"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </MobileAccountInfoRow>
          <MobileAccountInfoRow>
            <TextField
              style={{ marginBottom: 12.5, marginRight: 10 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={thumbnailImage}
              onChange={e => setThumbnailImage(e.target.value)}
              margin="dense"
              id="thumbnail-image-url"
              label="Thumbnail Image URL"
              type="text"
              placeholder="https://imgur.com/as8h92b"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={bioImage}
              onChange={e => setBioImage(e.target.value)}
              margin="dense"
              id="bio-image-url"
              label="Bio Image URL"
              type="text"
              placeholder="https://imgur.com/as8h92b"
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
              value={bioTitle}
              onChange={e => setBioTitle(e.target.value)}
              margin="dense"
              id="bio-title"
              label="Bio Title"
              type="text"
              placeholder="Experience the Legend"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={bioDescription}
              onChange={e => setBioDescription(e.target.value)}
              margin="dense"
              id="bio-description"
              label="Bio Description"
              type="text"
              placeholder="https://imgur.com/as8h92b"
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
              value={readMoreUrl}
              onChange={e => setReadMoreUrl(e.target.value)}
              margin="dense"
              id="read-more-url"
              label="Read More URL"
              type="text"
              placeholder="https://genius.com/as8h92b"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={twitterUrl}
              onChange={e => setTwitterUrl(e.target.value)}
              margin="dense"
              id="twitter-lesson-url"
              label="Twitter URL"
              type="text"
              placeholder="https://twitter.com/as8h92b"
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
              value={facebookUrl}
              onChange={e => setFacebookUrl(e.target.value)}
              margin="dense"
              id="facebook-lesson-url"
              label="Facebook URL"
              type="text"
              placeholder="https://facebook.com/course-name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={redditUrl}
              onChange={e => setRedditUrl(e.target.value)}
              margin="dense"
              id="reddit-lesson-url"
              label="Reddit URL"
              type="text"
              placeholder="https://reddit.com/course-name"
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
              value={valuePropTitle}
              onChange={e => setValuePropTitle(e.target.value)}
              margin="dense"
              id="value-prop-title"
              label="Value Prop Title"
              type="text"
              placeholder="22 Lessons"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={valuePropDescription}
              onChange={e => setValuePropDescription(e.target.value)}
              margin="dense"
              id="value-prop-description"
              label="Value Prop Description"
              type="text"
              placeholder="Exclusive acccess to..."
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
              value={valuePropTitle2}
              onChange={e => setValuePropTitle2(e.target.value)}
              margin="dense"
              id="value-prop-title-2"
              label="Value Prop Title 2"
              type="text"
              placeholder="Sample Pack"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={valuePropDescription2}
              onChange={e => setValuePropDescription2(e.target.value)}
              margin="dense"
              id="value-prop-description-2"
              label="Value Prop Description 2"
              type="text"
              placeholder="Over 24 samples..."
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
              value={valuePropTitle3}
              onChange={e => setValuePropTitle3(e.target.value)}
              margin="dense"
              id="value-prop-title-3"
              label="Value Prop Title 3"
              type="text"
              placeholder="Competition"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              style={{ marginBottom: 12.5 }}
              // onChange={e => usernameChanged(e.target.value)}
              //onKeyPress={e => e.key === 'Enter' && this.handleSubmit()}
              value={valuePropDescription3}
              onChange={e => setValuePropDescription3(e.target.value)}
              margin="dense"
              id="value-prop-description-3"
              label="Value Prop Description 3"
              type="text"
              placeholder="Share your musical works..."
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
            <ButtonText>CREATE COURSE</ButtonText>
          </FlatButton>
          <FlatButton
            onClick={() => toggleAddCourseModal(false)}
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
  open: view.showAddCourseModal,
});

export default connect(
  mapStateToProps,
  { toggleAddCourseModal, createCourse },
)(AddCourseModal);
