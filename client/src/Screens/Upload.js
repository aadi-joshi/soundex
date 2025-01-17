import React, { useEffect, useRef, useState} from 'react'
import { toast } from 'react-toastify';
import ipfsClient from '../config/ipfsConfig';
import nftStorage from '../config/ipfsConfig';

import useEth from '../contexts/EthContext/useEth';
import SongList from '../components/SongList';

import Util from './util';

const Upload = ({selectedSong, setSelectedSong}) => {
  const { state } = useEth();

  // using this for reload data on song like/dislike or purchase
  const [toggle, setToggle] = useState(false);

  const [songs, setSongs] = useState([]);

  // Add these new state hooks
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: ''
  });

  useEffect(() => {
    const getSongs = async () => {
      try {
        const allSongsIds = await state.contract.methods.getOwnedSongs().call({ from: state.account });
        console.log("getOwnedSongs",allSongsIds);
        const songs = await Promise.all(allSongsIds.map(async (songId) => {
          const song = await state.contract.methods.getSongDetails(songId).call({ from: state.account });
          return {
            'songName' : song[0],
            'artistAddr' : song[1],
            'artistName' : song[2],
            'likeCount' : song[3],
            'dislikeCount' : song[4],
            'cost' : song[5],
            'songStatus' : song[6],
            'songURL' : song[7].startsWith('http') ? song[7] : `https://ipfs.io/ipfs/${song[7]}`,
            'songHash': songId,
            'songFileName': song[7]
          };
        }));
        console.log("songs",songs);
        setSongs(songs);
      } catch (error) {
        console.error('Error fetching songs:', error);
        toast.error('Error fetching songs');
      }
    }
    if (state.contract && state.account) {
      getSongs();
    }
  }, [state.contract, state.account, toggle]);

  const handleAddNewSong = async (values) => {
    try {
      setOpenPopup(false);
      setNotify({
        isOpen: true,
        message: 'Uploading song to IPFS...',
        type: 'info',
      });

      // File size validation (50MB limit)
      if (values.songFile.size > 50 * 1024 * 1024) {
        throw new Error('File size should be less than 50MB');
      }

      // Create blob with proper metadata
      const songBlob = new Blob([values.songFile], { 
        type: values.songFile.type 
      });
      
      // Upload to NFT.storage with proper headers
      let result;
      try {
        result = await nftStorage.storeBlob(songBlob, {
          headers: {
            'Authorization': `Bearer ${nftStorage.token}`,
            'Content-Type': 'application/car'
          }
        });
      } catch (error) {
        console.error('First upload attempt failed, retrying...', error);
        // Retry with explicit headers
        result = await nftStorage.storeBlob(songBlob, {
          headers: {
            'Authorization': `Bearer ${nftStorage.token}`,
            'Content-Type': 'application/car'
          }
        });
      }

      const url = `https://ipfs.io/ipfs/${result}`;

      // Continue with contract interaction
      state.contract.methods
        .uploadSong(values.songName.trim(), values.songCost, url)
        .send({ from: state.account })
        .then((data) => {
          setNotify({
            isOpen: true,
            message: 'Song uploaded successfully',
            type: 'success',
          });
          values.closePopup();
        })
        .catch((error) => {
          let msg = Util.metamaskErrorParser(error);
          setNotify({
            isOpen: true,
            message: msg,
            type: 'error',
          });
        });
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      setNotify({
        isOpen: true,
        message: `Upload failed: ${error.message}`,
        type: 'error',
      });
    }
  };

  return (
    <div>
      <h1 style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        My Purchased Songs
      </h1>
      <div> 
        <SongList
          songsList={songs}
          selectedSong={selectedSong}
          setSelectedSong={setSelectedSong}
          screen='upload'
          setToggle={setToggle}
          handleAddNewSong={handleAddNewSong}
        />
      </div>
    </div>
  )
}

export default Upload

// https://bafybeigzpxg2powlrwf3aoa4xy4uj7nouj7x23hq7ioxosnexbhvo56zx4.ipfs.w3s.link/hOSAANA.MP3
// https://bafybeigzpxg2powlrwf3aoa4xy4uj7nouj7x23hq7ioxosnexbhvo56zx4.ipfs.dweb.link/hOSAANA.MP3%7D