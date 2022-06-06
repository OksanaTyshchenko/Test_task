import "./Header.scss";

export const Header = () => {
  return (
    <header className="Header">
      <div className="container">
        <div className="Header__top">
          <a href="/">
            <img src={require("../../images/Logo.png")} alt="Logo" />
          </a>

          <div className="Header__buttons">
            <button className="button Header__button">Users</button>

            <button className="button Header__button">Sign up</button>
          </div>
        </div>
        <div className="Header__content">
          <div className="Header__info">
            <h1 className="Header__title">
              Test assignment for front-end developer
            </h1>
            <p className="Header__describe">
              What defines a good front-end developer is one that has skilled
              knowledge of HTML, CSS, JS with a vast understanding of User
              design thinking as they'll be building web interfaces with
              accessibility in mind. They should also be excited to learn, as
              the world of Front-End Development keeps evolving.
            </p>
            <button className="button Header__button">Sign up</button>
          </div>
        </div>
      </div>
    </header>
  );
};
