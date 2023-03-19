import React, { useState } from "react";
import { Typography, CssBaseline, Container, Grid ,LinearProgress  } from "@material-ui/core";
import { Button } from "@material-ui/core";






function App() {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const styles = {
    gradientText: {
      background: '-webkit-linear-gradient(50deg,#e6fa72,#64ff97 30%,#62ff93 77%,#c1ff64)',
      '-webkit-background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
      fontWeight: 'bold',
      margin:'15px 0'
    }
  }



  const handleSubmit = async (event) => {
    setImageUrl()
    setIsLoading(true);
    // Make API call or database request here
    // Wait for response
    
    event.preventDefault();

    const response = await fetch(`http://localhost:8080/image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: ` ${description}` }),
    });

    const imageUrl = await response.text();

    

    setImageUrl(imageUrl);
    setIsLoading(false);
  };


  const ImgSkeleton = () => (
    <div>
     <p style={{color:"white"}}>Generating...</p>
    </div>
  );

  return (
    <>
      <CssBaseline></CssBaseline>
      <div>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" style={styles.gradientText} >
            Text to Image Generator
          </Typography>



          <form onSubmit={handleSubmit}>
            <Grid container justifyContent="center" spacing={2} style={{marginBottom:"15px"}}>
              <Grid item xs={8}>
                <textarea
                  style={{
                    borderRadius: "8px",
                    width: "100% ",
                    height: "100%",
                    resize: "none",
                    fontSize: "13px",
                    fontWeight: "400",
                    border: "none!important",
                    color: "#2b2b2b",
                    padding: "8px",
                    transition: "all .3s,height 0s",
                  }}
                  type="text"
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={2}>
                <Button
                  contained
                  type="submit"
                  style={{
                    background: " #62ff93",
                    width: "100% ",
                    height: "100%",
                  }}
                >
                  Generate
                </Button>
              </Grid>
            </Grid>
          </form>


          <Grid
           
            xs={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{overflow:"hidde",marginTop:'10px'}}
          >




            {isLoading && 


            <ImgSkeleton/>


            }










            {imageUrl && (
              <img
              style={{
                
                maxWidth:'700px',
                height:'100%',
                with:'100%',
                objectFit:'cover',
                marginTop:'5px',
                marginBottom:'15px',
                borderRadius:'4px'

              }}
             
                src={imageUrl}
                alt="Generated Image"
              />
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default App;
