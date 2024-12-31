import { useSelector } from 'react-redux';

// material UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TimeSheetInputForm from '../components/TimeSheetInputForm';

function Home() {
  const { isLoggedIn, translations } = useSelector((state) => ({
    isLoggedIn: state.isLoggedIn,
    translations: state.translations[state.selectedLanguage],
  }));

  return (
    <Container fixed id="main">
      {isLoggedIn && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className="app-main">
              <h1>{translations.home_page_title}</h1>
              <hr />
              <h2>{translations.home_page_subtitle}</h2>

              <TimeSheetInputForm translations={translations} />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Home;
