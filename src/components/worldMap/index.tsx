// import { Grid } from '@mui/material'
// import React from 'react'

// function GridLayout() {
//   return (
//     <>
//       <Grid container item lg={12} md={12} sm={12}>
//         <Grid container item lg={4} md={4} sm={12} sx={{border:"1px solid red"}}>
//           <Grid item lg={12} md={12} sm={12}>Lorem ipsum dolor sit amet, consectet adipiscing elit,
//             sed do eiusmod tempor incididunt ut labore et dolor</Grid>
//           <Grid container item lg={12} md={12} sm={12}>
//             <Grid lg={4} md={4} sm={4}>images </Grid>
//             <Grid lg={4} md={4} sm={4}>
//               Lincoln Talbot
//               Businessman</Grid>
//             <Grid lg={4} md={4} sm={4}>DFouble qoutes</Grid>
//           </Grid>
//         </Grid>
//         <Grid container item lg={4} md={4} sm={12} sx={{border:"1px solid red"}}>
//           <Grid item lg={12} md={12} sm={12}></Grid>
//           <Grid container item lg={12} md={12} sm={12}>
//             <Grid lg={4} md={4} sm={4}>1</Grid>
//             <Grid lg={4} md={4} sm={4}>2</Grid>
//             <Grid lg={4} md={4} sm={4}>3</Grid>
//           </Grid>
//         </Grid>
//         <Grid container item lg={4} md={4} sm={12} sx={{border:"1px solid red"}}>
//           <Grid item lg={12} md={12} sm={12}></Grid>
//           <Grid container item lg={12} md={12} sm={12}>
//             <Grid lg={4} md={4} sm={4}>1</Grid>
//             <Grid lg={4} md={4} sm={4}>2</Grid>
//             <Grid lg={4} md={4} sm={4}>3</Grid>
//           </Grid>
//         </Grid>
//         <Grid container item lg={4} md={4} sm={12}>
//           <Grid item lg={12} md={12} sm={12}></Grid>
//           <Grid container item lg={12} md={12} sm={12}>
//             <Grid lg={4} md={4} sm={4}>1</Grid>
//             <Grid lg={4} md={4} sm={4}>2</Grid>
//             <Grid lg={4} md={4} sm={4}>3</Grid>
//           </Grid>
//         </Grid>
//         <Grid container item lg={4} md={4} sm={12}>
//           <Grid item lg={12} md={12} sm={12}></Grid>
//           <Grid container item lg={12} md={12} sm={12}>
//             <Grid lg={4} md={4} sm={4}>1</Grid>
//             <Grid lg={4} md={4} sm={4}>2</Grid>
//             <Grid lg={4} md={4} sm={4}>3</Grid>
//           </Grid>
//         </Grid>
//         <Grid container item lg={4} md={4} sm={12}>
//           <Grid item lg={12} md={12} sm={12}></Grid>
//           <Grid container item lg={12} md={12} sm={12}>
//             <Grid lg={4} md={4} sm={4}>1</Grid>
//             <Grid lg={4} md={4} sm={4}>2</Grid>
//             <Grid lg={4} md={4} sm={4}>3</Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   )
// }

// export default GridLayout

import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import imagebohemian from "../../assets/bohemian-man-with-his-arms-crossed_1368-3542.avif";
import imageyoung from "../../assets/young-bearded-man-with-striped-shirt_273609-5677.avif";
import imageadult from "../../assets/handsome-happy-bearded-man_74855-2827.avif";
import imagehandsome from "../../assets/handsome-smiling-man-wearing-green-shirt-standing-against-blue-background_662251-587.avif";
import imageguy from "../../assets/guy-shows-thumbs-up_140725-7874.avif";
import image from "../../assets/portrait-confident-serious-young-man_114579-79034.avif";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

function GridLayout() {
  // Data for grids
    const gridData = [
      { 
          id: 1, 
          title: 'Software Engineer', 
          img: 'https://res.cloudinary.com/dheqzi81c/image/upload/v1734779008/bohemian-man-with-his-arms-crossed_1368-3542_qpflqy.avif', 
          name: 'John Doe', 
          profession: 'Patient', 
          content: 'Teleconsultation experience was seamless and professional, making it easy to connect with a knowledgeable oncologist from the comfort of my home' 
      },
      { 
          id: 2, 
          title: 'Graphic Designer', 
          img: 'https://res.cloudinary.com/dheqzi81c/image/upload/v1734778690/young-bearded-man-with-striped-shirt_273609-5677_afu9ik.avif', 
          name: 'Jane Smith', 
          profession: 'Patient', 
          content: 'Grateful for the convenience of teleconsultation, as it allowed me to receive expert advice from an oncologist without the need for travel' 
      },
      { 
          id: 3, 
          title: 'Project Manager', 
          img: 'https://res.cloudinary.com/dheqzi81c/image/upload/v1734778574/handsome-happy-bearded-man_74855-2827_tk7uuv.avif', 
          name: 'Michael Johnson', 
          profession: 'Patient', 
          content: 'The online consultation was very efficient, and the oncologist took the time to answer all my questions in detail, making me feel confident in my treatment plan.' 
      },
      { 
          id: 4, 
          title: 'Data Scientist', 
          img: 'https://res.cloudinary.com/dheqzi81c/image/upload/v1734778586/handsome-smiling-man-wearing-green-shirt-standing-against-blue-background_662251-587_nre6l3.avif', 
          name: 'Emily Davis', 
          profession: ' Patient', 
          content: 'Teleconsultation has made it so much easier for me to stay in touch with my doctor, especially during these times. ' 
      },
      { 
          id: 5, 
          title: 'UX/UI Designer', 
          img: 'https://res.cloudinary.com/dheqzi81c/image/upload/v1734778564/guy-shows-thumbs-up_140725-7874_oh6a0q.avif', 
          name: 'David Lee', 
          profession: ' Patient', 
          content: 'I was impressed by the smoothness of the telemedicine platform and the professionalism of the oncologist,' 
      },
      { 
          id: 6, 
          title: 'Marketing Specialist', 
          img: 'https://res.cloudinary.com/dheqzi81c/image/upload/v1734779846/portrait-confident-serious-young-man_114579-79034_ruiyod.avif', 
          name: 'Sophia Williams', 
          profession: 'Patient ', 
          content: 'Having access to a top-tier oncologist remotely has been a game changer for me. The convenience and quality of the consultation exceeded my expectations' 
      },
  ];

  // Group data into chunks of 3 for the carousel
  const groupedData = [];
  for (let i = 0; i < gridData.length; i += 3) {
    groupedData.push(gridData.slice(i, i + 3));
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Carousel */}
      <Carousel
        autoPlay={true} // Enable auto sliding
        interval={3000} // Slide every 3 seconds (increased for smoother transition)
        indicators={true}
        navButtonsAlwaysVisible={true}
        cycleNavigation={true}
        animation="slide"
        sx={{
          '& .MuiCarousel-root': {
            transition: 'transform 3s ease-in-out', // Increased duration for smoother slide
          },
        }}
      >
        {groupedData.map((group, index) => (
          <Grid container spacing={2} key={index} sx={{ marginTop: '12px' }} justifyContent={"center"} alignContent={"center"}>
            {group.map((gridItem) => (
              <Grid
                container
                item
                lg={3}
                md={3}
                sm={6}
                key={gridItem.id}
                justifyContent={"center"}
                alignContent={"center"}
                sx={{ 
                  background:"#093B5B",
                  borderRadius: 2, 
                  padding: 2, 
                  margin: 2, 
                  boxSizing: 'border-box',
                  transition: 'transform 3s ease-in-out', // Smooth transition to the individual grid
                }}
              >
                {/* First Grid with 12 columns */}
                <Grid item xs={12} sx={{ marginBottom: 4, color:"lightgray",padding:"10px",  }}>
                  <Typography sx={{ fontSize:"13px",fontFamily:'Inter, sans-serif',fontWeight:"bold", textAlign:"justify"}}>{gridItem.content}</Typography>
                </Grid>

                {/* Second Grid with 12 columns containing 3 grids of 4 columns */}
                <Grid container item xs={12} spacing={2}>
                  <Grid item xs={3}>
                  <Box sx={{ padding: 2, textAlign: 'left'}}>
                    <img src={gridItem.img} alt={gridItem.name} style={{ width: '55px', height: '55px', borderRadius: '50%' }} />
                  </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{padding: 2, textAlign: 'left', color:'whitesmoke', fontFamily:'Inter, sans-serif', fontSize:"14px"}}>
                    {gridItem.name}
                      <br />
                      {gridItem.profession}
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box sx={{ padding: 2, textAlign: 'center', color:"#10a0bd" }}>
                     <FormatQuoteIcon/>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>
        ))}
      </Carousel>
    </Box>
  );
}

export default GridLayout;



// import React, { useState, useEffect } from "react";
// import { Grid, Box, Typography } from "@mui/material";
// import Carousel from "react-material-ui-carousel";

// const GridCarousel = () => {
//   const gridItems = [
//     { id: 1, title: "Grid 1", content: "Content for Grid 1" },
//     { id: 2, title: "Grid 2", content: "Content for Grid 2" },
//     { id: 3, title: "Grid 3", content: "Content for Grid 3" },
//     { id: 4, title: "Grid 4", content: "Content for Grid 4" },
//     { id: 5, title: "Grid 5", content: "Content for Grid 5" },
//     { id: 6, title: "Grid 6", content: "Content for Grid 6" },
//   ];

//   const [visibleIndices, setVisibleIndices] = useState([0, 1, 2]);

//   // Auto-slide logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setVisibleIndices((prev) => {
//         const nextStartIndex = (prev[0] + 1) % gridItems.length;
//         return [
//           nextStartIndex,
//           (nextStartIndex + 1) % gridItems.length,
//           (nextStartIndex + 2) % gridItems.length,
//         ];
//       });
//     }, 2000); // Change slides every 2 seconds
//     return () => clearInterval(interval); // Cleanup interval on unmount
//   }, [gridItems.length]);

//   return (
//     <Carousel
//       indicators={false}
//       navButtonsAlwaysVisible
//       autoPlay={false} // Custom autoPlay handled via useEffect
//       animation="slide"
//     >
//       {/* Render visible grids dynamically */}
//       <Grid container spacing={2} justifyContent="center">
//         {visibleIndices.map((index) => (
//           <Grid
//             item
//             lg={3}
//             md={4}
//             sm={6}
//             xs={12}
//             key={gridItems[index].id}
//             sx={{
//               border: "1px solid red",
//               borderRadius: 2,
//               padding: 2,
//               margin: 2,
//               textAlign: "center",
//               boxSizing: "border-box",
//             }}
//           >
//             <Typography variant="h6">{gridItems[index].title}</Typography>
//             <Typography>{gridItems[index].content}</Typography>
//             <Box
//               sx={{
//                 backgroundColor: "#e0e0e0",
//                 padding: 2,
//                 marginTop: 2,
//                 textAlign: "center",
//               }}
//             >
//               Additional Content
//             </Box>
//           </Grid>
//         ))}
//       </Grid>
//     </Carousel>
//   );
// };

// export default GridCarousel;
