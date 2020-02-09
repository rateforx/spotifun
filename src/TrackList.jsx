import React          from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Track          from './Track.jsx';
import ScaleLoader    from 'react-spinners/ScaleLoader';

const tracksToLoad = 50;

export default class TrackList extends React.Component {

    constructor ( props, context ) {
        super( props, context );
        this.state = {
            tracks  : [],
            hasMore : true,
        };
    }

    componentDidMount () {
        this.loadMore( 0 ).then();
    }

    async loadMore ( page ) {
        let response = await this.props.spotifyWebApi.getMySavedTracks( {
            limit  : tracksToLoad,
            offset : page * tracksToLoad,
        } );
        console.log( { response } );
        this.setState( {
            tracks : [ ...this.state.tracks, ...response.body.items ],
        } );
        console.log( this.state );

        if ( response.body.next === null ) {
            this.setState( {
                hasMore : false,
            } );
        }
    }

    render () {
        return (
            <InfiniteScroll
                className = 'd-flex w-100'
                style = { {
                    flexFlow : 'row wrap',
                } }
                pageStart = { 0 }
                loadMore = { this.loadMore.bind( this ) }
                hasMore = { this.hasMore }
                loader = { <ScaleLoader
                    height = { 35 }
                    width = { 4 }
                    radius = { 2 }
                    margin = { 2 }
                    key = { 0 }
                /> }
                initialLoad = { false }
                useWindow = { false }
            >
                { this.state.tracks && this.state.tracks.map( track => {
                    return <Track
                        key = { track.track.id }
                        data = { track.track }
                        spotifyWebApi = { this.props.spotifyWebApi }
                    />;
                } ) }
            </InfiniteScroll>
        );
    }
};