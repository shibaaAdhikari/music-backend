// const createSongHandler = async (req, reply) => {
//   try {
//     const { artist_id, album_id, song_name, duration, release_date } = req.body;
//     const song = await req.server.Song.create({
//       artist_id,
//       album_id,
//       song_name,
//       duration,
//       release_date,
//     });
//     reply.code(201).send({ song });
//   } catch (err) {
//     console.error(err);
//     reply.code(500).send({ error: "Internal Server Error", err });
//   }
// };

// const getAllSongsHandler = async (req, reply) => {
//   try {
//     const songs = await req.server.Song.findAll();
//     reply.code(200).send({ songs });
//   } catch (err) {
//     console.error(err);
//     reply.code(500).send({ error: "Internal Server Error", err });
//   }
// };

// const deleteSongHandler = async (req, reply) => {
//   try {
//     const { song_id } = req.params;
//     await req.server.Song.destroy({ where: { song_id } });
//     reply.code(200).send({ message: "Song deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     reply.code(500).send({ error: "Internal Server Error", err });
//   }
// };

// const updateSongHandler = async (req, reply) => {
//   try {
//     const { song_id } = req.params;
//     const { artist_id, album_id, song_name, duration, release_date } = req.body;
//     await req.server.Song.update(
//       { artist_id, album_id, song_name, duration, release_date },
//       { where: { song_id } }
//     );
//     reply.code(200).send({ message: "Song updated successfully" });
//   } catch (err) {
//     console.error(err);
//     reply.code(500).send({ error: "Internal Server Error", err });
//   }
// };

// export {
//   createSongHandler,
//   getAllSongsHandler,
//   deleteSongHandler,
//   updateSongHandler,
// };
import fastifyMulter from "fastify-multer";
const upload = fastifyMulter({ dest: "uploads/" });


// Create a song handler
const createSong = async (req, res) => {
  try {
    // Access the uploaded image file
    const imageFile = req.file;

    // Create a new song instance with the request body data
    const newSong = {
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      song_name: req.body.song_name,
      duration: req.body.duration,
      durationInSeconds: req.body.durationInSeconds,
      release_date: req.body.release_date,
    };

    // If an image file is uploaded, update the image_path field
    if (imageFile) {
      newSong.image_path = imageFile.path;
    }

    // Create the song record in the database
    const createdSong = await Song.create(newSong);

    res.send({ message: 'Song created successfully!', song: createdSong });
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export {createSong};




