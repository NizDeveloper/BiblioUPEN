import { ReactComponent as BookIcon } from "../../assets/images/icons/book.svg";
import { ReactComponent as BookLoanIcon } from "../../assets/images/icons/book-loan.svg";
import { ReactComponent as GroupIcon } from "../../assets/images/icons/group.svg"
import { ReactComponent as WarningIcon } from "../../assets/images/icons/warnign.svg"

function Cards(){
  return(
    <div className="cards-container">
      <div className="card-item">
        <div className="card-content">
          <div className="card-icon">
            <BookIcon/>
          </div>

          <div className="card-text">
            <span className="title">TOTAL BOOKS</span>

            <span className="info">1,250</span>

            <span className="text">+12 this month</span>
          </div>
        </div>
      </div>

      <div className="card-item">
        <div className="card-content">
          <div className="card-icon">
            <BookLoanIcon/>
          </div>

          <div className="card-text">
            <span className="title">BOOKS ON LOAN</span>

            <span className="info">87</span>

            <span className="text">7% of total</span>
          </div>
        </div>
      </div>

      <div className="card-item">
        <div className="card-content">  
          <div className="card-icon">
            <GroupIcon/>
          </div>

          <div className="card-text">
            <span className="title">TOTAL STUDENTS</span>

            <span className="info">340</span>

            <span className="text">+45 this month</span>
          </div>
        </div>
      </div>

      <div className="card-item warning">
        <div className="card-content">
          <div className="card-icon">
            <WarningIcon/>
          </div>

          <div className="card-text">
            <span className="title">OVERDUE LOANS</span>

            <span className="info">5</span>

            <span className="text">Requires Attention</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;