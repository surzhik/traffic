

var Sidebar = React.createClass({
    render: function() {
        return (
            <div className="sidebar">
              <ul>
                <li className="active">
                  <i className="dashboard-icon"></i><span>Dashboard</span>
                </li>
                <li>
                  <a href="#"><i className="IOT-devices-icon"></i><span>IOT Devices</span></a>
                </li>
                <li>
                  <a href="#"><i className="IOT-security-icon"></i><span>IOT Security</span></a>
                </li>
                <li>
                  <a href="#"><i className="sensor-icon"></i><span>Sensor Visibility</span></a>
                </li>
                <li>
                  <a href="#"><i className="anomaly-icon"></i><span>Anomaly Detection</span></a>
                </li>
                <li>
                  <a href="#"><i className="vulnerability-icon"></i><span>Vulnerability Dectection</span></a>
                </li>
                <li>
                  <a href="#"><i className="leak-icon"></i><span>Data Leak</span></a>
                </li>
              </ul>
            </div>
            );
    }
});


var Header = React.createClass({
    render: function() {
        return (
            <header>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    { /*  header start */ }
                    <div className="header-wrapper">
                      { /*  menu and breadcrumb start */ }
                      <div className="header-left-part">
                        { /*  menu button start */ }
                        <div className="header-menu-button">
                          <a
                             className="menu-button-bars"
                             href="#"></a>
                        </div>
                        { /*  menu button end */ }
                        { /*  breadrumb start */ }
                        <div className="header-breadcrumb">
                          <ol className="breadcrumb">
                            <li className="active">
                              <a href="#">Devices</a>
                            </li>
                          </ol>
                        </div>
                        { /*  breadrumb end */ }
                      </div>
                      { /*  menu and breadcrumb end */ }
                      { /*  logo start */ }
                      <div className="header-logo-wrapper">
                        <a href="#"><span className="header-logo"></span></a>
                      </div>
                      { /*  logo end */ }
                      { /*  notifications, searchbox, user avatar start */ }
                      <div className="header-right-part">
                        { /*  notifications start */ }
                        <div className="header-notifications">
                          <a href="#"><i></i> <span className="header-notifications-count">10</span></a>
                        </div>
                        { /*  notifications end */ }
                        { /*  header searchbox start */ }
                        <div className="header-searchbox">
                          <form>
                            <input
                                   type="text"
                                   placeholder="Search" />
                            <button type="submit"></button>
                          </form>
                        </div>
                        { /*  header searchbox end */ }
                        { /*  header user avatar start */ }
                        <div className="header-user-avatar">
                          <div className="dropdown">
                            <button
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                    data-toggle="dropdown"
                                    id="avatarMenu"
                                    type="button"
                                    className="btn btn-default dropdown-toggle">
                              <img
                                   alt="avatar"
                                   src="./img/avatar.svg" />
                            </button>
                            <ul
                                aria-labelledby="avatarMenu"
                                className="dropdown-menu">
                              <li>
                                <a href="#">Cabinet</a>
                              </li>
                              <li>
                                <a href="#">Log out</a>
                              </li>
                              <li>
                                <a href="#">Something else here</a>
                              </li>
                              <li>
                                <a href="#">Something else here</a>
                              </li>
                            </ul>
                          </div>
                        </div>
                        { /*  header user avatar end */ }
                      </div>
                      { /*  notifications, searchbox, user avatar end */ }
                    </div>
                    { /*  header end */ }
                  </div>
                </div>
              </div>
            </header>
            );
    }
});



/* filters block*/

var Filter = React.createClass({
   getInitialState: function() {
        return {
            filter: {
                by: "",
                actions: []
            }
        };
    },
    componentDidMount: function() {

        this.serverRequest = $.get(this.props.source, function(result) {
            console.log(result)
            this.setState({
                filter: result
            });
        }.bind(this));

    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },


    render: function() {
        var by = this.state.filter.by,
            actions = this.state.filter.actions,
            selected = "All", a;
        if (actions.length > 0) {

            for (a in actions) {
                if (actions[a].selected)
                    selected = actions[a].name;
            }
        }
        return (
            <div className="filter-item">
              <div className="filter-title">
                <p>
                  Filter by { by }
                </p>
              </div>
              <div className="filter-dropdown dropdown">
                <button
                        className="btn btn-default dropdown-toggle"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true">
                  <span><span>{ selected }</span> <span className="dropdown-caret"></span></span>
                </button>
                <ul
                    className="dropdown-menu"
                    aria-labelledby="filter">
                  { actions.map(function(action, index) {
                        return <li key={ index }>
                                 <a href={ action.url }>
                                   { action.name }
                                 </a>
                               </li>;
                    }) }
                </ul>
              </div>
            </div>
        )
    }
});


/* eof filters block*/

/* tables block*/
var Table = React.createClass({
    getInitialState: function() {
        return {
            table: {
                name: "",
                cols: [],
                rows: [],
                rows_total: 0,
                view_all_url: ""
            }
        };
    },
    componentDidMount: function() {

        this.serverRequest = $.get(this.props.source, function(result) {
            console.log(result)
            this.setState({
                table: result
            });
        }.bind(this));

    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },


    render: function() {
        var name = this.state.table.name,
            cols = this.state.table.cols,
            rows = this.state.table.rows,
            rows_total = this.state.table.rows_total,
            view_all_url = this.state.table.view_all_url,
            rowTemplate = function() {
                return (<tr></tr>)
            },
            indicator = ["blocked", "allowed", "active"];
        if (rows.length > 0) {
            rowTemplate = rows.map(function(item, index) {
                return (
                    <tr key={ index }>
                      <td>
                        { item.device }
                      </td>
                      <td>
                        <i className={ 'indicator-' + indicator[item.action] }></i>
                        <span>{ indicator[item.action] }</span>
                      </td>
                      <td className="number-red">
                        { item.risk }
                      </td>
                      <td className="number-red">
                        { item.threads }
                      </td>
                      <td>
                        <span>{ item.bandwidth }<sub>bytes/s</sub></span>
                        <button className="dots">
                          ...
                        </button>
                      </td>
                    </tr>
                )
            })
        }


        return (
            <div className="table-wrapper">
              <div className="table-title">
                <h4>{ name }</h4>
              </div>
              <div className="table-content">
                <table className="table">
                  <tbody>
                    <tr>
                      { cols.map(function(col, index) {
                            return <td key={ index }>
                                     { col }
                                   </td>;
                        }) }
                    </tr>
                    { rowTemplate }
                    <tr>
                      <td>
                        { rows.length } of { rows_total } display
                      </td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <a href={ view_all_url }>View All</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

        )
    }
});

/* eof tables block*/


var App = React.createClass({
    getInitialState: function() {
        return {
            devices: {
                sidebar: {},
                header: {},
                filters: [],
                tables: []
            }
        };
    },

    componentDidMount: function() {

        this.serverRequest = $.get(this.props.source, function(result) {
            console.log(result)
            this.setState({
                devices: result
            });
        }.bind(this));

    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {

        return (
            <div className='app'>
              <Sidebar data={ this.state.devices.sidebar } />
              <div className="wrapper">
                <Header data={ this.state.devices.header } />
                <div className="content-wrapper devices">
                  <div className="filters-wrapper">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-xs-12">
                         <div className="filtes">
                            <Filter source="filter_category.json" />
                            <Filter source="filter_brand.json" />
                            <Filter source="filter_risk.json" />
                            <Filter source="filter_year.json" />
                            <Filter source="filter_bandwidth.json" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <Table source="tab_multimedia.json" />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <Table source="tab_wearables.json" />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <Table source="tab_smarthome.json" />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <Table source="tab_mobiles.json" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
    }
});

ReactDOM.render(
    <App source="devices.json" />,
    document.getElementById('wrap')
);