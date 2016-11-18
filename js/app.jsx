

/* bandwidth block*/
var Bandwidth = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            weekly: React.PropTypes.number.isRequired,
            average: React.PropTypes.number.isRequired,
            income: React.PropTypes.number.isRequired,
            income_diff: React.PropTypes.number.isRequired,
            outcome: React.PropTypes.number.isRequired,
            outcome_diff: React.PropTypes.number.isRequired,
            comsumption: React.PropTypes.number.isRequired,
            comsumption_diff: React.PropTypes.number.isRequired,
            dates: React.PropTypes.array.isRequired,
            values: React.PropTypes.array.isRequired,
            traffic: React.PropTypes.array.isRequired
        })
    },

    render: function() {

        var weekly = this.props.data.weekly,
            average = this.props.data.average,
            income = this.props.data.income,
            income_diff = this.props.data.income_diff,
            outcome = this.props.data.outcome,
            outcome_diff = this.props.data.outcome_diff,
            comsumption = this.props.data.comsumption,
            comsumption_diff = this.props.data.comsumption_diff,
            traffic = this.props.data.traffic,
            dates = this.props.data.dates,
            values = this.props.data.values,
            total = income + outcome;

        this.doChart({
            dates: dates,
            values: values
        });
        //console.log(traffic)
        this.doMap({
            traffic: traffic
        });

        return (
            <div className="row">
              <div className="col-md-4 col-sm-6 col-xs-12">
                <div className="content-left">
                  <div className="content-header">
                    <h6>Devices Bandwidth</h6>
                  </div>
                  <div className="content-parameters">
                    { /* weekly bandhwidth and weekly averange start */ }
                    <div className="content-parameters-main">
                      <div className="weekly-bandwidth">
                        <div className="weekly-bandwidth-number">
                          <h1>{ weekly }</h1>
                        </div>
                        <div className="weekly-bandwidth-text">
                          <p>
                            gb
                          </p>
                          <p>
                            Weekly Bandwidth
                          </p>
                        </div>
                      </div>
                      <div className="weekly-averange">
                        <span>{ average } gb</span>
                        <span>Weekly Average</span>
                      </div>
                    </div>
                    { /* weekly bandhwidth and weekly averange end */ }
                    { /* sliders start */ }
                    <div className="content-parameters-sliders">
                      { /* slider with parameters start */ }
                      <div className="parameters-sliders-item income-traffic">
                        <div className="parameters-slider-name">
                          <h5>Income Traffic</h5>
                        </div>
                        <div className="parameters-slider-data">
                          <div className="slider">
                            <span
                                  style={ { width: (100 / total * income) + '%' } }
                                  className="slider-load"></span>
                          </div>
                          <div className="capacity-rate">
                            <div className="capacity">
                              <span>{ income } GB</span>
                            </div>
                            <div className="rate">
                              <i className={ "rate-" + (income_diff > 0 ? "up" : "down") }></i>
                              <span>{ income_diff }%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      { /* slider with parameters end */ }
                      { /* slider with parameters start */ }
                      <div className="parameters-sliders-item outcome-traffic">
                        <div className="parameters-slider-name">
                          <h5>Outcome Traffic</h5>
                        </div>
                        <div className="parameters-slider-data">
                          <div className="slider">
                            <span
                                  style={ { width: (100 / total * outcome) + '%' } }
                                  className="slider-load"></span>
                          </div>
                          <div className="capacity-rate">
                            <div className="capacity">
                              <span>{ outcome } GB</span>
                            </div>
                            <div className="rate">
                              <i className={ "rate-" + (outcome_diff > 0 ? "up" : "down") }></i>
                              <span>{ outcome_diff }%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      { /* slider with parameters end */ }
                    </div>
                    { /* sliders end */ }
                    <div className="parameters-graph">
                      { /* graph start */ }
                      <div
                           className="graph-img"
                           id="graph-img">
                      </div>
                      { /* graph end */ }
                    </div>
                    { /* bottom parameters start */ }
                    <div className="parameters-bottom">
                      <div className="parameters-bottom-left">
                        <p>
                          { comsumption }gb
                        </p>
                        <p>
                          Current Weekly Bandwidth Comsumption
                        </p>
                      </div>
                      <div className="parameters-bottom-right">
                        <p>
                          <i className={ "rate-" + (comsumption_diff > 0 ? "up" : "down") }></i><span>{ comsumption_diff }%</span>
                        </p>
                        <p>
                          Below Weekly Average
                        </p>
                      </div>
                    </div>
                    { /* bottom parameters end */ }
                  </div>
                </div>
              </div>
              <div className="col-md-8 col-sm-6 col-xs-12">
                <div className="content-right">
                  <div className="content-header">
                    <h6>Devices Traffic</h6>
                  </div>
                  <div className="content-right-map">
                    <div
                         className="map-canvas"
                         id="map-canvas"></div>
                  </div>
                  <div className="map-info">
                    <div className="map-info-item">
                      <i className="map-item-indicator indicator-active"></i>
                      <span>Active</span>
                    </div>
                    <div className="map-info-item">
                      <i className="map-item-indicator indicator-allowed"></i>
                      <span>Allowed</span>
                    </div>
                    <div className="map-info-item">
                      <i className="map-item-indicator indicator-blocked"></i>
                      <span>Blocked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    },

    doChart: function(data) {
        if (data.dates == undefined || data.values == undefined)
            return false;
        var x = $.merge(["x"], data.dates),
            data1 = $.merge(["Traffic"], data.values);

        var chart = c3.generate({
            bindto: "#graph-img",
            size: {
                height: 160
            },
            padding: {
                top: 0,
                right: 30,
                bottom: 10,
                left: 20,
            },
            data: {
                x: 'x',
                columns: [
                    x, data1
                ],
                types: {
                    Traffic: 'area'
                },
                colors: {
                    Traffic: '#169ad4'

                }
            },
            grid: {
                x: {
                    show: true
                }
            },
            point: {
                r: 8
            },
            legend: {
                show: false
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%B %d'
                    }
                },
                y: {
                    show: false
                }
            }
        });

    },

    doMap: function(data) {
        var colors = ["#e33000", "#00ad0b", "#4a4a4a"],
            markers = [],
            fill = [],
            r = [], loc, point;
        if (data.traffic == undefined)
            return false;
        for (loc in data.traffic) {
            point = data.traffic[loc];
            markers.push({
                latLng: point.latLng,
                name: point.name
            });
            fill.push(colors[point.type]);
            r.push(point.mb);
        }

        $('#map-canvas').vectorMap({
            map: 'world_mill',
            backgroundColor: '#f3f5f5',
            normalizeFunction: 'polynomial',
            regionStyle: {
                initial: {
                    fill: '#f3f5f5',
                    "fill-opacity": 1,
                    stroke: '#666666',
                    "stroke-width": 0.5,
                    "stroke-opacity": 1
                },
                hover: {
                    fill: '#169ad4',
                    cursor: 'pointer'
                },
            },

            markerStyle: {
                initial: {

                    "stroke-opacity": 0
                }
            },

            markers: markers,
            series: {
                markers: [{
                    attribute: 'r',
                    scale: [5, 15],
                    values: r
                },
                    {
                        attribute: 'fill',
                        values: fill
                    },
                ]
            },

        });

    }
});

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
                            <li>
                              <a href="#">Devices</a>
                            </li>
                            <li>
                              <a href="#">Multimedia Category</a>
                            </li>
                            <li className="active">
                              Samsung TV
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


/* bar block*/

var Bar = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            total: React.PropTypes.number.isRequired,
            threads: React.PropTypes.number.isRequired,
            risk: React.PropTypes.number.isRequired,
            model: React.PropTypes.string.isRequired,
            year: React.PropTypes.number.isRequired

        })
    },


    render: function() {
        var total = this.props.data.total,
            threads = this.props.data.threads,
            risk = this.props.data.risk,
            model = this.props.data.model,
            year = this.props.data.year;
        return (
           <div className="col-sm-12">
            <div className="content-header">
              <div className="content-header-item">
                <div className="number">
                  <h2>{ total }</h2>
                </div>
                <div className="header-item-text">
                  <span>Devices</span>
                  <span>Total</span>
                </div>
              </div>
              <div className="content-header-item">
                <div className="number">
                  <h2>{ threads }</h2>
                </div>
                <div className="header-item-text">
                  <span>Threats</span>
                  <span>Yesterday</span>
                </div>
              </div>
              <div className="content-header-item">
                <div className={ 'number number-' + ((risk > 4) ? 'red' : '') }>
                  <h2>{ risk }</h2>
                </div>
                <div className="header-item-text">
                  <span>Risk</span>
                  <span>Level</span>
                </div>
              </div>
              <div className="content-header-item">
                <div className="header-item-text">
                  <span>{ model }</span>
                  <span>Model</span>
                </div>
              </div>
              <div className="content-header-item">
                <div className="header-item-text">
                  <span>{ year }</span>
                  <span>Year</span>
                </div>
              </div>
            </div>
            </div>
        )
    }
});
/* eof bar block*/


var App = React.createClass({
    getInitialState: function() {
        return {
            devices: {
                sidebar: {},
                header: {},
                bar: {},
                bandwidth: {}
            }
        };
    },

    componentDidMount: function() {

        this.serverRequest = $.get(this.props.source, function(result) {
            this.setState({
                devices: result
            });
        }.bind(this));

    },

    componentWillUnmount: function() {
        this.serverRequest.abort();
    },

    render: function() {
        console.log(this.state.devices.length)
        return (
            <div className='app'>
              <Sidebar data={ this.state.devices.sidebar } />
              <div className="wrapper">
                <Header data={ this.state.devices.header } />
                <div className="content-header-wrapper">
                  <div className="container-fluid">
                    <div className="row">
                      <Bar data={ this.state.devices.bar } />
                    </div>
                  </div>
                </div>
                <div className="content-wrapper">
                  <div className="container-fluid">
                    <Bandwidth data={ this.state.devices.bandwidth } />
                  </div>
                </div>
              </div>
            </div>
            );
    }
});

ReactDOM.render(
    <App source="data.json" />,
    document.getElementById('wrap')
);


/* eof bandwidth block*/