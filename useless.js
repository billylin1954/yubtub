  import './App.css';
  let test=["./uploads/0001-0030.mp4","./uploads/0001-0250.mp4","./uploads/3.mp4","./uploads/2.mp4","./uploads/5.mp4","/uploads/0001-0072.mp4"];
  let vids=["./uploads/0001-0030.mp4","./uploads/0001-0250.mp4","./uploads/3.mp4","./uploads/2.mp4","./uploads/5.mp4","/uploads/0001-0072.mp4"]
  var arr=[]
  console.log(vids)


    fetch('http://localhost:3001/api/data')
    // .then(res => {
      //   console.log(res.json)
      //  const file=JSON.parse(res.json)
      //   console.log(file)
      // })
      .then(response => response.json())
      .then(result => {
        vids = result.response.slice();
        console.log(arr)
      })
      .catch(error => {
        console.log(error);
        // Handle the error in case the request is not successfull
      });
    
    
    console.log(arr)
    
  
    
    function Car(props) {
      return <h2><video width="500" controls >
      <source src={props.brand.link} type="video/mp4"></source>
    <br></br>
    </video> </h2>
    }
    function videos(val, index) {
      return (
        <div key={index}>
          <h2>{val.name}</h2>
          <video width="500" controls>
            <source src={val.link} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <br />
        </div>
      );
    }
    const videoList = vids.map((video, index) => videos(video, index));
    function Garage() {
    
      return (
        <>
          <div>{videoList}</div>
            { vids.forEach(videos)}
            {vids.map((car) => <Car brand={car} />)}
          
        </>
      );
    }
    
  function App() {
    return (
      <div>
        <a href="./upload.html">upload video</a>
        <h1>Yubtub</h1>
        <h2>Random Videos</h2>
        <br/>
      <Garage/>
      </div>
    );
  }

  export default App;