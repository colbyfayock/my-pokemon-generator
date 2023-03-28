import Container from '@/components/Container';

import styles from './Footer.module.scss';

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      <Container className={`${styles.footerContainer} ${styles.footerLegal}`}>
        <p>
          &copy; <a href="https://spacejelly.dev">Space Jelly</a>, {new Date().getFullYear()}
        </p>
        <p>
          Icons &amp; Colors from <a href="https://github.com/duiker101/pokemon-type-svg-icons">Pokemon Type SVG Icons</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
