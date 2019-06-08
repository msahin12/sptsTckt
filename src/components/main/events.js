import React, { useState, useEffect } from "react";
import "./main.scss";
import {
  Modal,
  Select,
  Input,
  Radio,
  DatePicker,
  notification,
  Icon,
  Table,
  Divider
} from "antd";
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { fetchEventsAction } from "../../redux/actions";
import _ from "lodash";
import moment from "moment";

const { Option } = Select;
const { RangePicker } = DatePicker;

//Columns for the events table.
const columns = [
  {
    title: "Event Type",
    dataIndex: "eventType",
    key: "eventType",
    sorter: (a, b) => {
      return a.eventType.localeCompare(b.eventType);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Event Name",
    dataIndex: "eventName",
    key: "eventName",
    sorter: (a, b) => {
      return a.eventName.localeCompare(b.eventName);
    },
    sortDirections: ["descend", "ascend"]
  },
  {
    title: "Local Date-Time",
    dataIndex: "eventDateTime",
    key: "eventDateTime",
    sorter: (a, b) => {
      return moment(a.eventDateTime).diff(b.eventDateTime) < 0 ? 1 : 0;
    },
    sortDirections: ["descend"]
  },
  {
    title: "Price",
    dataIndex: "eventPriceRange",
    key: "eventPriceRange"
  },

  {
    title: "Ticket",
    key: "eventTicketBuyUrl",
    render: (text, record) => {
      console.log("text");
      console.log(record.eventTicketBuyUrl);
      return (
        <span>
          <Divider type="vertical" />
          <a href={record.eventTicketBuyUrl}>
            {record.eventPriceRange === "N/A" ? "N/A" : "Buy"}
          </a>
        </span>
      );
    }
  }
];

// Main function of the component.
function Events(props) {
  const [allData, setAllData] = useState(props.events);
  const [dataInit, setDataInit] = useState(0);

  const [filterOpts, setfilterOpts] = useState({
    eventTypeFilter: "All",
    eventNameFilter: "All",
    eventDateTimeFilter: ["All"]
  });

  useEffect(() => {
    props.fetchEvents();
    console.log("use effect çalıştı");
  }, []);

  console.log("event props");
  console.log(props);
  let tableData = props.events;

  let eventList =
    props.events && _.uniq(props.events.map(item => item.eventName));
  eventList = _.sortBy(eventList);

  const onEventTypeChange = value => {
    setfilterOpts(filterOpts => ({
      ...filterOpts,
      eventTypeFilter: value
    }));
    tableData = props.events.filter(
      item =>
        (value == "All" ? true : item.eventType === value) &&
        (filterOpts.eventNameFilter === "All"
          ? true
          : item.eventName === filterOpts.eventNameFilter) &&
        (filterOpts.eventDateTimeFilter[0] === "All"
          ? true
          : moment(item.eventDateTime).diff(
              moment(filterOpts.eventDateTimeFilter[0])
            ) > 0 &&
            moment(item.eventDateTime).diff(
              moment(filterOpts.eventDateTimeFilter[1])
            ) < 0)
    );
    setAllData(tableData);
  };

  const onEventNameChange = value => {
    setfilterOpts(filterOpts => ({
      ...filterOpts,
      eventNameFilter: value
    }));
    tableData = props.events.filter(
      item =>
        (value === "All" ? true : item.eventName === value) &&
        (filterOpts.eventTypeFilter === "All"
          ? true
          : item.eventType === filterOpts.eventTypeFilter) &&
        (filterOpts.eventDateTimeFilter[0] === "All"
          ? true
          : moment(item.eventDateTime).diff(
              moment(filterOpts.eventDateTimeFilter[0])
            ) > 0 &&
            moment(item.eventDateTime).diff(
              moment(filterOpts.eventDateTimeFilter[1])
            ) < 0)
    );
    setAllData(tableData);
  };

  const onDateFilterChange = (dates, dateStrings) => {
    setfilterOpts(filterOpts => ({
      ...filterOpts,
      eventDateTimeFilter: dateStrings[0] ? dateStrings : ["All"]
    }));

    tableData = props.events.filter(
      item =>
        (!dateStrings[0]
          ? true
          : moment(item.eventDateTime).diff(moment(dateStrings[0])) > 0 &&
            moment(item.eventDateTime).diff(moment(dateStrings[1])) < 0) &&
        (filterOpts.eventTypeFilter === "All"
          ? true
          : item.eventType === filterOpts.eventTypeFilter) &&
        (filterOpts.eventNameFilter === "All"
          ? true
          : item.eventName === filterOpts.eventNameFilter)
    );
    setAllData(tableData);
  };

  if (dataInit === 0 && props.loading) setDataInit(dataInit + 1);
  if (dataInit === 1 && !props.loading) {
    setDataInit(dataInit + 1);
    tableData = _.sortBy(props.events, field => field.departure);
    setAllData(tableData);
  }

  return (
    <div className="tickets-section">
      <div className="tickets-tab">
        <div className="event-select">
          <div className="main-labels"> Events: </div>
          <Select
            id="eventSelect"
            defaultValue="All"
            showSearch
            style={{ width: 200 }}
            placeholder="Select Event"
            optionFilterProp="children"
            onChange={onEventTypeChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="All">All</Option>
            <Option key="NFL">NFL</Option>
            <Option key="MLB">MLB</Option>
          </Select>
        </div>

        <div className="filter-event">
          <div className="main-labels"> Event Filters </div>
          <Select
            id="arrivalSelect"
            className="select-group"
            defaultValue="All"
            showSearch
            style={{ width: 200 }}
            placeholder="Enter Keywords..."
            selected={0}
            optionFilterProp="children"
            onChange={onEventNameChange}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="All">All</Option>

            {eventList &&
              eventList.map((item, index) => (
                <Option key={item}>{item}</Option>
              ))}
          </Select>
        </div>

        <div className="filter-date">
          <div className="main-labels"> Date Filters </div>

          <RangePicker
            disabledDate={current => current && current < moment().endOf("day")}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={onDateFilterChange}
          />
        </div>

        <Table
          scroll={{ x: "auto" }}
          columns={columns}
          expandedRowRender={record => (
            <div
              style={{
                textAlign: "center"
              }}
            >
              <img src={record.eventImageUrl} alt="image" width="200px" />

              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                  width: "100%",
                  fontSize: 32,
                  fontWeight: "bold"
                }}
              >
                {record.eventName}
              </p>
              <p
                style={{
                  margin: 0,
                  textAlign: "center",
                  width: "100%",
                  fontSize: 16,
                  fontWeight: "bold"
                }}
              >
                PUBLIC SALES : {record.eventPublicSalesDates}
              </p>
            </div>
          )}
          dataSource={allData}
          loading={props.loading}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = ({ events, loading }) => {
  console.log("mapStateToProps içi events");
  console.log(events);
  return {
    events,
    loading
  };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEventsAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);
