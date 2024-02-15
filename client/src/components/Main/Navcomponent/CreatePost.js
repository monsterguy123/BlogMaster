import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  CardActions,
  Container,
} from '@mui/material';
import Navbar from './Navbar';

const CreatePost = () => {
  const id = localStorage.getItem('userId');

  const SubmitHandler = async (formValues) => {
    try {
      const url = 'http://localhost:3000/api/userpost';
      await axios.post(url, formValues);
      // Show success message to the user
      alert('Post created successfully!');
      // Clear form fields after successful submission
      formik.resetForm();
    } catch (error) {
      console.log(error);
      // Show error message to the user
      alert('An error occurred while creating the post. Please try again later.');
    }
  };

  const formik = useFormik({
    initialValues: {
      image: '',
      title: '',
      description: '',
      PostedBy: '',
      user: id,
      categories: '',
    },
    onSubmit: SubmitHandler,
  });

  return (
    <>
      <Navbar />
      <Container maxWidth="sm" style={{ marginTop: '50px' }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Create a New Post
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="image"
                    value={formik.values.image}
                    onChange={formik.handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    variant="outlined"
                    InputLabelProps={{
                      className: 'cursive-label', // Apply custom CSS class
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Categories"
                    name="categories"
                    value={formik.values.categories.toLowerCase()}
                    onChange={formik.handleChange}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Posted By"
                    name="PostedBy"
                    value={formik.values.PostedBy}
                    onChange={formik.handleChange}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <CardActions>
                <Button type="submit" variant="contained" fullWidth>
                  Create Post
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default CreatePost;
