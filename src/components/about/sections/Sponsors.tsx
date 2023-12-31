import { Grid, Typography } from "@mui/material";
import React from "react";
import { SPONSORS } from "~/lib/constants";
import { SponsorsSectionsWrapper } from "../styles";

interface ISponsorProps {
  logo: string,
  name: string,
  id: string,
}

const Sponsor: React.FC<ISponsorProps> = (props) => {
  return (
    <>
      <img className={'image'} src={props.logo} alt="Partner" />
    </>
  )
}

const SponsorsSection = () => {
  return (
    <SponsorsSectionsWrapper>
      <Typography variant="h2" gutterBottom className={'subtitle'}>
        Our Sponsors
      </Typography>
      <Grid 
        container 
        spacing={2} 
        className={'sponsors'}
        justifyContent="center"
      >
        {SPONSORS.map(partner => (
        <Grid item
          className={'imageWrapper'}
          lg={3}
          md={3}
          sm={4}
          xs={5}
          key={partner.id}
        >
          <Sponsor
            {...partner}
          />
        </Grid>
        ))}
      </Grid>

    </SponsorsSectionsWrapper>
  )
}

export default SponsorsSection;