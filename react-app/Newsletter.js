import React, { PureComponent } from 'react';
import BookTransactions from "../Components/Newsletter/BookTransactions/BookTransactions";
import BooksByYear from "../Components/Newsletter/BooksByYear/BooksByYear";
import CongregationalPreaching from "../Components/Newsletter/CongregationalPreaching/CongregationalPreaching";
import MonthlyContinents from "../Components/Newsletter/MonthlyContinents/MonthlyContinents";
import AllCountries from "../Components/Newsletter/AllCountries/AllCountries";
import TopTenTempleByContinent from "../Components/Newsletter/TopTenTempleByContinent/TopTenTempleByContinent";
import TopIndividuals from "../Components/Newsletter/TopIndividuals/TopIndividuals";
import AllTemples from "../Components/Newsletter/AllTemples/AllTemples";
import TopTenCountriesCumulative from "../Components/Newsletter/TopTenCountriesCumulative/TopTenCountriesCumulative";
import FairPlayRules from "../Components/Newsletter/FairPlayRules/FairPlayRules";
class Newsletter extends React.Component {
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
    console.log('m in newsletter page', localStorage.getItem("test"))
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
            src="./img/newsletter/headerimage.png"
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
export default Newsletter;
