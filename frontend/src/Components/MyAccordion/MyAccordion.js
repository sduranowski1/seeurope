import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CampaignPricelist = () => (
  <Typography>
    {/* Add content for Campaign Pricelist here */}
    Campaign Pricelist content goes here.
  </Typography>
);

const MyFavProducts = () => (
  <Typography>
    {/* Add content for My Fav Products here */}
    My Favorite Products content goes here.
  </Typography>
);

const MyDetails = () => (
  <Typography>
    {/* Add content for My Details here */}
    My Details content goes here.
  </Typography>
);

const DocumentImageBank = () => (
  <Typography>
    {/* Add content for Document Image Bank here */}
    Document Image Bank content goes here.
  </Typography>
);

const MyAccordion = () => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Campaign Pricelist</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <CampaignPricelist />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>My Fav Products</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MyFavProducts />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>My Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <MyDetails />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>Document Image Bank</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DocumentImageBank />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default MyAccordion;
