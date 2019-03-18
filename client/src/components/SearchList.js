import React from 'react'
import SearchListContainer from '../containers/SearchListContainer'
import Search from './Search';

const SearchList = props => {
    props.searchObject.forEach(searchObject => {
        debugger
            return(
                <div>
                  Song name: {searchObject.name} 
                  Artist: {searchObject.artists[0].name}
                  ID: {searchObject.id}
                </div>
             )
        
    });
    
}

export default SearchList