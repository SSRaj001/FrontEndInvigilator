export default function App({ subredditsToShow }) {
    const [views, setViews] = useState([]);
  
    const extractData = response =>
      response.data.children.map(({ data }) => data);
  
    useEffect(() => {
      async function loadViews() {
        const subredditsToShow = await searchSubreddit(
          'react hooks'
        ).then(extractData);
        const componentPromises = subredditsToShow.map(
          async data => {
            const View = await importView(data.subreddit);
            return (
              <View key={shortid.generate()} {...data} />
            );
          }
        );
  
        Promise.all(componentPromises).then(setViews);
      }
  
      loadViews();
    }, [subredditsToShow]);
  
    return (
      <React.Suspense fallback='Loading views...'>
        <div className='container'>{views}</div>
      </React.Suspense>
    );
  }