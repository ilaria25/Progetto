import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Hopmepage() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function call() {
      let res = await fetch("http://localhost:3001/login", {
        credentials: "include",
      });
      let json = await res.json();

      if (res.status === 200) {
        setUsername(json.username);
      } else {
        navigate("/");
      }
    }
    call();
  }, []);

  async function logout() {
    await fetch("http://localhost:3001/login", {
      method: "PUT",
      credentials: "include",
    });
    navigate("/");
  }

  return (
    <body>
      <header className="header">
        <span>
          <h1 className="title">NerdRum.com</h1>
        </span>
        <span>
          <nav>
            <ul className="nav-menu">
              <a href="./Homepage" className="pages">
                Home
              </a>
              <a href="./Contacts" className="pages">
                Contacts
              </a>
            </ul>
          </nav>
        </span>
        <span className="button">
          {username}
          <button onClick={logout}>Logout</button>
        </span>
        <div className="top-menu">
          <nav>
            <ul className="list">
              <li>
                <a href="../OnePiece" className="pages">
                  One Piece
                </a>
              </li>
              <li>
                <a href="../Naruto" className="pages">
                  Naruto
                </a>
              </li>
              <li>
                <a href="../AoT" className="pages">
                  Attack On Titan
                </a>
              </li>
              <li>
                <a href="../Bleach" className="pages">
                  Bleach
                </a>
              </li>
              <li>
                <a href="../MyHeroAcademia" className="pages">
                  My Hero Academia
                </a>
              </li>
              <li>
                <a href="../Jjk" className="pages">
                  Jujutsu Kaisen
                </a>
              </li>
              <li>
                <a href="../DemonSlayer" className="pages">
                  Demon Slayer
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className="main-body">
        <h1 className="home-title">Welcome to NerdRum.com forum!</h1>
        <div className="content">
          <p className="text">
            This is the right community for those who, like us, have an
            unbridled passion for anime <br></br> and for the world of Japan! By
            subscribing you will be able to see countless anime posts and
            contents, <br></br> and actively participate in debates and
            discussions about your favorite anime! <br></br> All you have to do
            is sign up and have fun!
          </p>
          <div>
            <h6 className="home-title-two">About ani-manga culture</h6>
            <p className="text-two">
              Manga and anime are perhaps Japan's biggest cultural export and
              they make up <br></br> one of the most recognizable art styles on
              the planet.
              <br></br> Since the nineties, when everyone in the western world
              <br></br> was suddenly talking about Pokémon, Digimon, Yu-Gi-Oh!,
              and Dragon Ball Z, <br></br> anime has become something of a
              household term. Something completely associated with Japan{" "}
              <br></br>
              and something that has become one of the biggest cultural trends
              among children and young adults ever since. <br></br> Yet, the
              world of Japanese anime is a lot more varied and complex than we
              in the west might realize. <br></br> 'Anime' only in the west
              refers to Japanese animation as a whole. <br></br> In Japanese
              culture, anime is actually a term for any mass-produced animation,
              Japanese or non-Japanese. <br></br> More, importantly, in Japan,
              anime is not just culture for kids. <br></br> Rather, anime series
              like Naruto or Attack on Titan were all hugely successful amongst
              adults too.
              <br></br> Indeed, many of these series were actually intended for
              adults developing complex themes and plotlines <br></br> and
              presenting three-dimensional and realistic characters.
              <br></br>
              This is the beauty of anime. It can range from the shoujo anime
              shows such as the 'magical girl' series <br></br> like Cardcaptor
              Sakura to the poetic and haunting anime movies like Spirited Away
              and Princess Mononoke.
            </p>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p className="privacy">
          @Our Privacy Policy Generator can help you generate a customized
          Privacy Policy in around three minutes, for free. <br></br>
          Our Terms & Conditions Generator can help you generate a customized
          Terms & Conditions agreement in around three minutes, for free.
          <br></br>
        </p>
      </footer>
    </body>
  );
}
