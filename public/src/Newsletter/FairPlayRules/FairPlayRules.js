import React from 'react';
class FairPlayRules extends React.Component {
  render() {
    return (
        <div>
        <div className='top-content'>
          <h3 className='m-0'> FAIR PLAY RULES</h3> </div>
        <div className='newsletter-fair-play'>
          <p className='m-0 newsletter-rules-main'>
            1997 GBC Resolution #103: That the score system for the Sankirtan Newsletter
            is changed to include the following for individual distribution:</p>
          <p className='m-0 newsletter-rules-heading'>1.  The category "Regular"</p>
          <p className='m-0 newsletter-rules'>(a)  to count only literature which is actually sold for some profit
          (ideally double BBT price) and given into the hands of the
            receivers personally.</p>  
          <p className='m-0 newsletter-rules'>(b)  literature distributed by accepting post dated checks shall only
            be counted when at least the BBT price has been received.</p>  
          <p className='m-0 newsletter-rules-heading'>2.  The new category "Subsidized" for the following methods of distribution
            for individuals:</p>    
          <p className='m-0 newsletter-rules'>(a)  devotees working in teams of two or more and recording their group
            effort as one score.</p>   
          <p className='m-0 newsletter-rules'>(b)  subsidized books which are sold for BBT price or less.</p>   
          <p className='m-0 newsletter-rules'>(c)  sponsored books which are given to people who can value them
            (i.e. VIPs, libraries, schools, prisons, etc.).</p>     
          <p className='m-0 newsletter-rules'>Those individuals who are doing these types of subsidized distribution
          must specify it when reporting scores to the newsletter. Temple and
          Country scores stay the same. There is no need to report temple scores
          in two categories.
          </p>   
          <p className='m-0 newsletter-rules-heading'>3.  Free distribution</p>   
          <p className='m-0 newsletter-rules'>Free distribution by individuals and temples who give out literature
          free of cost shall not be counted in the newsletter (except as provided
          for in "Subsidized" above).</p>   
          <p className='m-0 newsletter-rules' style={{ paddingTop: 15 }}><b>Note:</b> Individuals distributing an unusually large number of books will
          automatically be put in the Special Teams Unlimited (Subsidized) category
            unless they explain why they belong in the Regular category. </p>     
        </div>
        </div>
    );
  }
}

export default FairPlayRules;
