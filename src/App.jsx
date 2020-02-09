import React         from 'react';
import './App.css';
import './theme.css';
import hash          from './hash';
import TrackList     from './TrackList';
import SpotifyWebApi from 'spotify-web-api-node';

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId            = '94d14232fd9b478ca10efda477ad05e4';
const redirectUri         = window.location.origin;
const scopes = [
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-library-read',
    'user-modify-playback-state',
];

export default class App extends React.Component {

    constructor ( props, context ) {
        super( props, context );
        // if ( localStorage.getItem( 'token' ) ) {
        //     this.state = {
        //         token : localStorage.getItem( 'token' ),
        //     };
        //     console.log( `Token: ${ this.state.token }` );
        //} else {
        this.state = {
            token : null,
        };
        this.spotifyWebApi = new SpotifyWebApi();
        this.spotifyWebApi.setClientId( clientId );
        this.spotifyWebApi.setRedirectURI( redirectUri );
        if ( hash.access_token ) {
            this.state = {
                token : hash.access_token,
            };
            localStorage.setItem( 'token', this.state.token );
            this.spotifyWebApi.setAccessToken( this.state.token );
        }
        // this.state = {
        //     token : undefined,
        // };
        // }
    }

    // async componentDidMount () {
    //     if ( hash.access_token ) {
    //         this.setState( {
    //             token : hash.access_token,
    //         } );
    //     }
    // }

    render () {
        let authUrl = `${ authEndpoint }?client_id=${ clientId }&redirect_uri=${ redirectUri }&scope=${ scopes.join(
            '%20' ) }&response_type=token&show_dialog=true`;

        return (
            <div className = "App">
                { !this.state.token ? (
                    <div className = 'd-flex align-items-center w-100 vh-100 justify-content-center'
                         style = { {
                             height : '100vh',
                         } }
                    >
                        <a
                            href = { authUrl }
                            className = 'btn btn-light btn-lg'
                            style = { {
                                transform : 'scale(2)',
                            } }
                        >
                            Login to Spotify
                        </a>
                    </div>
                ) : (
                    <TrackList
                        token = { this.state.token }
                        spotifyWebApi = { this.spotifyWebApi }
                    />
                ) }
            </div>
        );
    }
}