import React from 'react';
import BookTransactions from "./Newsletter/BookTransactions/BookTransactions";
import FairPlayRules from "./Newsletter/FairPlayRules/FairPlayRules";
import AllCountries from "./Newsletter/AllCountries/AllCountries";
import AllTemples from "./Newsletter/AllTemples/AllTemples";
import TopIndividuals from "./Newsletter/TopIndividuals/TopIndividuals";
import CongregationalPreaching from "./Newsletter/CongregationalPreaching/CongregationalPreaching";
import BooksByYear from "./Newsletter/BooksByYear/BooksByYear";
import MonthlyContinents from "./Newsletter/MonthlyContinents/MonthlyContinents";
import TopTenTempleByContinent from "./Newsletter/TopTenTempleByContinent/TopTenTempleByContinent";
import TopTenCountriesCumulative from "./Newsletter/TopTenCountriesCumulative/TopTenCountriesCumulative";

class GenerateNewsLetter extends React.Component {
   // componentDidMount ()  {
   //    let newsletterData = {year: "2020", period: Array(0)}
   //    localStorage.setItem(
   //       "newsletter_filter",
   //       JSON.stringify(newsletterData)
   //     );
   // }

   constructor() {
      super();
      var objDate = new Date(),
        locale = "en-us",
        month = objDate.toLocaleString(locale, { month: "long" });
      this.state = {
        currentMonth: month,
        currentYear: new Date().getFullYear(),
      };
    }
  
    async componentDidMount() {
      console.log('props', this.props.match.params, 'state', this.state);
      let data = {
        year : this.props.match.params.year,
        period : {
          period_id : this.props.match.params.period_id
        }
      }
       localStorage.setItem(
      "newsletter_filter",
      JSON.stringify(data)
    );
      // console.log('this.props.match.params.year', data)
      // return false;
      //       let newsletterData = {year: "2019", period: Array(0)}
      // localStorage.setItem(
      //    "newsletter_filter",
      //    JSON.stringify(newsletterData)
      //  );
   //  console.log('m in newsletter page', JSON.parse(localStorage.getItem("newsletter_filter")))
      if ("newsletter_filter" in localStorage) {
        const newsletter_filter = JSON.parse(localStorage.getItem("newsletter_filter"));
        let month_name = new Date().toLocaleString("en-us", { month: "long" });
        if (Object.keys(newsletter_filter.period).length === 0){
          this.setState({ currentYear: newsletter_filter.year });
        }else{ 
          if (newsletter_filter.period.start_date && newsletter_filter.period.end_date) {
            const start_date = newsletter_filter.period.start_date;
            const end_date = newsletter_filter.period.end_date;
            if (new Date(start_date).getMonth() === new Date(end_date).getMonth()) {
              month_name = new Date(start_date).toLocaleString("en-us", { month: "long" });
            } else {
              month_name = new Date(start_date).toLocaleString("en-us", { month: "long" }) + ' - ' + new Date(end_date).toLocaleString("en-us", { month: "long" }) ;
            }
          }
          this.setState({
            currentMonth: month_name,
            currentYear: newsletter_filter.year 
          });
        }
      }
    }
   render() {
    document.body.classList.add("newsletter-pad-0");
      return (
         <div className="wholepage">
          <div className="newsletter-header">
          <img
            className="image1"
            src="../../images/newsletter/headerimage.png"
            alt="Sankirtanheader"
          />
          <div className="heading_block">
            <h1>World Sankirtan Newsletter</h1>
            <h3>
              {this.state.currentMonth} {this.state.currentYear}
            </h3>
          </div>
        </div>
        <main>
          <BookTransactions />
          <BooksByYear />
          <CongregationalPreaching />
          <MonthlyContinents />
          <TopIndividuals />
          <TopTenTempleByContinent />
          <AllCountries />
          <AllTemples />
          <TopTenCountriesCumulative />
          <FairPlayRules />
        </main>
      </div>
      );
   }
}

export default GenerateNewsLetter;