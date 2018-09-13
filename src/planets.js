import React, { Component } from 'react';
import Planet from './planet';

class Planets extends Component {

    constructor(props){
        super(props);
        this.allResults=[];
        this.state={
            results: [],
            open: false,
            currentValue: this.props.currentValue || "",
            showPlanet:false,
            showPlanetIndex:-1,
        };
        this.filterData= this.filterData.bind(this);
        this.getPlanets();
    }  

    // dropdown will close on clicking outside the search results
    closeDropdown(event) {
        this.setState({
            open: false
        });          
    }
    // calling swapi api to get Planets
    getPlanets(){
        var _this= this;
        var url = "https://swapi.co/api/planets/";
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function(res) {
        if(this.readyState == 4 && this.status == 200)
        {
                _this.allResults = JSON.parse(this.responseText).results;
                _this.setState({
                    open:false,
                    results: _this.allResults
                });
                if(_this.state.currentValue.length > 0){
                    _this.filterData(_this.state.currentValue,_this.allResults);
                }
        }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    } 
    // filtering api data on basis of population
    filterData(searchString,data){
        var results =[];
            results = data.filter(function(value){
                return (value.name.toLowerCase()).match(searchString.toLowerCase());  
            });
            this.sortResults(results);
            this.setState({currentValue :searchString,results:results,open:true});
    }

    inputChanged(event){
        this.filterData(event.target.value,this.allResults);
    }
    /* if population is unknown, consider it 100 (least) for sorting
    */

   // showimg results in sorted order
    sortResults(results){
        results.sort(function(planet1,planet2){
                return (planet1.population === "unknown"? 100: planet1.population) -  (planet2.population === "unknown"? 100: planet2.population)
        });     
    }

    showPlanetDetails(value,index){
        var toggle = true;
        if(index == this.state.showPlanetIndex){
            toggle = ! this.state.showPlanet;
        }
        this.setState({
            showPlanet:toggle,
            showPlanetValue:value,
            showPlanetIndex: index
        })
    }
    logout (){
    localStorage.removeItem("status")
        this.props.history.push('/login');
    }
    maskClicked(event){
        if(event.target.className === "mask"){
            this.closeDropdown();
        }
    }
    render() {
        var _this= this; 
        if(!(localStorage.getItem("status"))){
                this.props.history.push('/login');
        }    
        return ( 
            <div >
            <div className="autocomplete-container">
                <div class="autocompleteCenter">
                    <div className="searchContainer">
                        <input type="text" value={this.state.currentValue} name="search" id="search" placeholder = "Search a Planet" onChange={this.inputChanged.bind(this)}  />
                    </div>                               
                    {this.state.open && 
                    <ul className="autocomplete-menu" onBlur={this.closeDropdown.bind(this)}>
                        <li className="firstLi"></li>
                        {this.state.results.map(function(value,index){
                            var height =  value.population !=="unknown"? (value.population/100000000) : 10;
                            if( height < 10){
                                height = 10;
                            }
                            else if(height >50){
                                height = 50;
                            }
                            var inlineStyle={
                            height: height,
                                "fontSize":height,
                                color:"black",
                                border: "1px"                     
                            }
                            return(
                                <li key={index} className={"autocomplete-menu-item "}  style={inlineStyle} onClick={_this.showPlanetDetails.bind(_this,value,index)}>
                                    {value.name}                            
                                </li>
                            )
                            })
                        }
                    </ul>}
                </div>
                <div className="logoutButton">
                        <span onClick={this.logout.bind(this)}> Logout</span>
                </div>         
                {_this.state.showPlanet && <Planet planet={_this.state.showPlanetValue} />}
            </div>
            {this.state.open &&
            <div >
                <p className='mask'  id ="mask" onClick={this.maskClicked.bind(this)}> </p>
            </div> }   
        </div>
        );
    }
}

export default Planets;
