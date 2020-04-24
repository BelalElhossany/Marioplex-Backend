const { user: userDocument, artist: artistDocument, album: albumDocument, track: trackDocument, playlist: playlistDocument, category: categoryDocument } = require('../models/db');


// initialize db 
const connection = require('../db-connection/connection');
const User = require('./user-api');
const Playlist = require('./playlist-api');
const checkMonooseObjectID = require('../validation/mongoose-objectid')
const Browse = {

    //get category by id
    getCategoryById: async function(categoryID) {
        if (!checkMonooseObjectID([categoryID])) return 0;
        let category = await categoryDocument.findById(categoryID, (err, category) => {
            if (err) return 0;
            return category;
        }).catch((err) => 0);
        return category;

    },
    getCategoryPlaylists: async function(categoryID, limit, offset) {
        let category = await this.getCategoryById(categoryID);
        if (!category) return 0;
        let playlists = []
        for (let i = 0; i < category.playlist.length; i++) {
            let playlist = await Playlist.getPlaylist(category.playlist[i]);
            if (playlist) {
                let playlistInfo = {};
                playlistInfo['_id'] = playlist._id;
                playlistInfo['name'] = playlist.name;
                playlistInfo['images'] = playlist.images;
                let owner = await User.getUserById(playlist.ownerId);
                if (owner) {
                    playlistInfo['ownerId'] = owner._id;
                    playlistInfo['ownerName'] = owner.displayName;
                }
                playlists.push(playlistInfo);
            }
        }
        return limitOffset(limit, offset, playlists);
    },

    // get categories
    getCategoryies: async function() {

        let category = await categoryDocument.find({}, (err, category) => {
            if (err) return 0;
            return category;
        }).catch((err) => 0);
        return category;

    },
    // to get genre list
    getGenreList: async function() {
        let artists = await artistDocument.find({}, (err, artists) => {
            if (err) return 0;
            return artists;
        }).catch((err) => 0);

        if (!artists) return 0;
        var genre = [];
        genre.push(artists[0].genre[0])
        for (let i = 0; i < artists.length; i++) {
            if (genre.length == (Number(process.env.GENRE_LIMIT) ? Number(process.env.GENRE_LIMIT) : 10))
                continue;
            for (let j = 0; j < artists[i].genre.length; j++) {
                if (genre.length == (Number(process.env.GENRE_LIMIT) ? Number(process.env.GENRE_LIMIT) : 10))
                    continue;
                for (let k = 0; k < genre.length; k++) {
                    if (artists[i].genre[j] == genre[k])
                        break;
                    if (k == genre.length - 1)
                        genre.push(artists[i].genre[j]);
                }
            }
        }
        return this.getPlaylistGenre(genre);
    },
    getPlaylistGenre: async function(genre) {
        let playlists = await playlistDocument.find({}, (err, playlists) => {
            if (err) return 0;
            return playlists;
        }).catch((err) => 0);
        if (!playlists) return 0;
        var allGenre = [];
        var playlistsGenre = [];
        for (let k = 0; k < genre.length; k++) {
            for (let i = 0; i < playlists.length; i++) {
                if (!playlists[i].snapshot) continue;
                if (!playlists[i].snapshot[playlists[i].snapshot.length - 1]) continue;
                if (!playlists[i].snapshot[playlists[i].snapshot.length - 1].hasTracks) continue;
                let track = await trackDocument.findById(playlists[i].snapshot[playlists[i].snapshot.length - 1].hasTracks[0], (err, track) => {
                    if (err) return 0;
                    return track;
                }).catch((err) => 0);
                if (track && track.genre && (track.genre[0] == genre[k] || track.genre[1] == genre[k])) {
                    const user1 = await userDocument.findById(playlists[i].ownerId);
                    playlistsGenre.push({ playlist: playlists[i], owner: { id: playlists[i].ownerId, name: user1 ? user1.name : '' } });
                }
            }
            if (playlistsGenre.length != 0)
                allGenre.push({ genre: genre[k], "playlists": playlistsGenre });
            playlistsGenre = [];
        }
        return allGenre;

    }


}
module.exports = Browse;

function limitOffset(limit, offset, categories) {

    let start = 0;
    let end = categories.length;
    if (offset != undefined) {
        if (offset >= 0 && offset <= categories.length) {
            start = offset;
        }
    }
    if (limit != undefined) {
        if ((start + limit) > 0 && (start + limit) <= categories.length) {
            end = start + limit;
        }
    } else {
        limit = Number(process.env.LIMIT) ? Number(process.env.LIMIT) : 20;
        if ((start + limit) > 0 && (start + limit) <= categories.length) {
            end = start + limit;
        }
    }
    categories.slice(start, end);
    return categories;
}