

import {
  Stack,
  Typography,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <Stack spacing={6} maxWidth={1000} mx="auto" py={4}>

      {/* HERO */}
      <Stack spacing={2}>
        <Typography variant="h3" fontWeight={600}>
          Nripesh Bhusal
        </Typography>

        <Typography variant="h6" color="text.secondary">
          Full-Stack Developer • MERN • Computer Science Student
        </Typography>

        <Typography maxWidth={700}>
          I build full-stack web applications with clean architecture,
          role-based access control, and production-ready APIs.
          This platform is one of my major projects.
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button
            variant="contained"
            component={Link}
            to="/blogs"
          >
            Read My Blogs
          </Button>

          <Button
            variant="outlined"
            component={Link}
            to="/authors"
          >
            Explore Authors
          </Button>

          <Button
            variant="outlined"
            href="/Nripesh_Bhusal_CV.pdf"
            target="_blank"
          >
            Download CV
          </Button>

          <Button
            variant="text"
            href="https://github.com/NripeshB"
            target="_blank"
          >
            GitHub
          </Button>
        </Stack>
      </Stack>

      <Divider />

      {/* ABOUT ME */}
      <Stack spacing={2}>
        <Typography variant="h5">About Me</Typography>
        <Typography color="text.secondary" maxWidth={800}>
          I am a computer science student passionate about backend systems,
          authentication flows, and building real-world applications.
          I enjoy working with Node.js, Express, MongoDB, and React,
          focusing on correctness, scalability, and maintainability.
        </Typography>
      </Stack>

      <Divider />

      {/* PROJECTS */}
      <Stack spacing={2}>
        <Typography variant="h5">Projects</Typography>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">
              Multi-User Blogging Platform
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 2 }}>
              A full-stack MERN application with authentication,
              author dashboards, admin governance, and content moderation.
            </Typography>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {[
                'React',
                'Redux Toolkit',
                'Material UI',
                'Node.js',
                'Express',
                'MongoDB',
                'JWT',
              ].map((tech) => (
                <Chip key={tech} label={tech} size="small" />
              ))}
            </Stack>

            <Box mt={2}>
              <Button
                size="small"
                component={Link}
                to="/blogs"
              >
                View Blogs
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Stack>

      <Divider />

      {/* SKILLS */}
      <Stack spacing={2}>
        <Typography variant="h5">Skills</Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          {[
            'JavaScript',
            'TypeScript (basic)',
            'React',
            'Redux Toolkit',
            'Node.js',
            'Express',
            'MongoDB',
            'REST APIs',
            'JWT Auth',
            'Git',
          ].map((skill) => (
            <Chip key={skill} label={skill} />
          ))}
        </Stack>
      </Stack>

      <Divider />

      {/* FOOTER CTA */}
      <Stack spacing={1}>
        <Typography variant="h6">
          Interested in my work?
        </Typography>

        <Typography color="text.secondary">
          You can explore my blogs, check my code on GitHub,
          or reach out for internships and collaborations.
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Home

