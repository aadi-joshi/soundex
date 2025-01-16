const Soundex = artifacts.require('Soundex.sol');

contract('Soundex', ()=>{
    it('count test', async () => {
        const soundex = await Soundex.new();
        const num = await soundex.countTest();
        assert(num == 524288)
    });
})

// contract('Soundex', ()=>{
//     it('Songs test init', async () => {
//         const soundex = await Soundex.new();
//         const allsongs = await soundex.getAllSongs();
//         assert(allsongs.length == 2)
//     });
// })

// contract('SongSC', ()=>{
//     it('Songs test add', async () => {
//         const songSC = await SongSC.new();
//         let s = Song()
//         s.id = "sid3";
//         s.name = "Song3";
//         await SongSC.addSong(song);
//         const allsongs = await songSC.getAllSongs();
//         assert(allsongs.length == 2)
//     });
// })