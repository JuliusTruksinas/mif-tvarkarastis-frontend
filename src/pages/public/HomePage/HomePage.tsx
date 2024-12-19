import styles from './HomePage.module.scss';
import Julius from '../../../assets/images/Julius.jpg';
import Liveta from '../../../assets/images/Liveta.jpg';
import Nika from '../../../assets/images/Nika.jpg';
import Nojus from '../../../assets/images/Nojus.jpg';
import Gustavas from '../../../assets/images/Gustavas.jpg';
import BugBuster from '../../../assets/images/BugBuster.jpg';
import JuliusC from '../../../assets/images/JuliusCrazy.jpg';
import LivetaC from '../../../assets/images/LivetaCrazy.jpg';
import NikaC from '../../../assets/images/NikaCrazy.jpg';
import NojusC from '../../../assets/images/NojusCrazy.jpg';
import GustavasC from '../../../assets/images/GustavasCrazy.jpg';
import BugBusterC from '../../../assets/images/BusterCrazy.jpg';

const HomePage = () => {
  return (
    <div className={styles.registerPage}>
      <h1 className={styles.title}>About us</h1>
      <p className={styles.pageSubtitle}>View information about Bug busters</p>
      <div className={styles.programContainer}>
        <label className="swap swap-flip">
          <input type="checkbox" />
          <div className="swap-on">
            <img className={styles.fotkyte} src={JuliusC} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Julius</p>
              <p className={styles.inputLabel}>
                Suvalgau tiek mėsos, kad kažkur pasaulyje 5 veganai nedaro jokio
                skirtumo.
              </p>
            </div>
          </div>
          <div className="swap-off">
            <img className={styles.fotkyte} src={Julius} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Julius</p>
              <p className={styles.inputLabel}>Teamlead and Full-stack</p>
            </div>
          </div>
        </label>

        <label className="swap swap-flip">
          <input type="checkbox" />
          <div className="swap-on">
            <img className={styles.fotkyte} src={LivetaC} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Liveta</p>
              <p className={styles.inputLabel}>
                Visus pinigus išleidžiu ant kelionių ir baklavos.
              </p>
            </div>
          </div>
          <div className="swap-off">
            <img className={styles.fotkyte} src={Liveta} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Liveta</p>
              <p className={styles.inputLabel}>Web Design and Front-end</p>
            </div>
          </div>
        </label>

        <label className="swap swap-flip">
          <input type="checkbox" />
          <div className="swap-on">
            <img className={styles.fotkyte} src={NikaC} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Nika</p>
              <p className={styles.inputLabel}>
                Turiu juodą karate diržą, todėl namuose valgyti gamins ir namus
                tvarkys vyras.
              </p>
            </div>
          </div>
          <div className="swap-off">
            <img className={styles.fotkyte} src={Nika} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Nika</p>
              <p className={styles.inputLabel}>Web Design and Front-end</p>
            </div>
          </div>
        </label>

        <label className="swap swap-flip">
          <input type="checkbox" />
          <div className="swap-on">
            <img className={styles.fotkyte} src={NojusC} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Nojus</p>
              <p className={styles.inputLabel}>Skridau iš trečio aukšto.</p>
            </div>
          </div>
          <div className="swap-off">
            <img className={styles.fotkyte} src={Nojus} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Nojus</p>
              <p className={styles.inputLabel}>Full-stack</p>
            </div>
          </div>
        </label>

        <label className="swap swap-flip">
          <input type="checkbox" />
          <div className="swap-on">
            <img className={styles.fotkyte} src={GustavasC} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Gustavas</p>
              <p className={styles.inputLabel}>
                Keičiu savo muzikos skonį kas savaitę.
              </p>
            </div>
          </div>
          <div className="swap-off">
            <img className={styles.fotkyte} src={Gustavas} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Gustavas</p>
              <p className={styles.inputLabel}>Back-end</p>
            </div>
          </div>
        </label>

        <label className="swap swap-flip">
          <input type="checkbox" />
          <div className="swap-on">
            <img
              className={styles.fotkyte}
              src={BugBusterC}
              alt="User Avatar"
            />
            <div className={styles.description}>
              <p className={styles.name}>Bug Buster’is</p>
              <p className={styles.inputLabel}>Aš čia ne savo noru.</p>
            </div>
          </div>
          <div className="swap-off">
            <img className={styles.fotkyte} src={BugBuster} alt="User Avatar" />
            <div className={styles.description}>
              <p className={styles.name}>Bug Buster’is</p>
              <p className={styles.inputLabel}>Psychologist</p>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default HomePage;
