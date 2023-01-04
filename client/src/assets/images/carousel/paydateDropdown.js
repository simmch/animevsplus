import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getPayrollByDate } from '../../../actions/payroll/payroll';
const PaydateDropdown = ({ paydates, getPayrollByDate }) => {

    const onClickHandler = (e) => {
        e.preventDefault();
        let date = e.target.name;
        getPayrollByDate(e.target.name)
        console.log(e.target.name)
    }

    const listDates = paydates.map(record => {
        return record.map(item => {
            return <Dropdown.Item name={item.PAYDATE} key={item._id} onClick={onClickHandler}>{item.PAYDATE}</Dropdown.Item>
        })
    });

    return (

        <Dropdown>
            <Dropdown.Toggle variant="btn btn-outline-primary" id="dropdownMenuOutlineButton1">
                Pay Date Options
                    </Dropdown.Toggle>
            <Dropdown.Menu>
                {listDates}
            </Dropdown.Menu>
        </Dropdown>

    )
}

const mapStateToProps = (state) => ({
    paydates: state.paydates
})
export default connect(mapStateToProps, { getPayrollByDate })(PaydateDropdown);
