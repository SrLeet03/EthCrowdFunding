import { FunctionComponent } from "react";
import styles from "./WebsiteTech.module.css";

const WebsiteTech: FunctionComponent = () => {
  return (
    <div className={styles.websiteTech}>
      <div className={styles.heroSection}>
        <img
          className={styles.maskGroupIcon}
          alt=""
          src="../mask-group@2x.png"
        />
        <b className={styles.theFutureOfContainer}>
          <span>{`The Future of `}</span>
          <span className={styles.fundraising}>Fundraising</span>
          <span> is Here</span>
        </b>
        <div className={styles.aDecentralizedOpenSource}>
          A decentralized open-source crowdfunding/investing platform whose
          mission is to change the rules of the game in the world of
          investments.
        </div>
        <div className={styles.loremAnd120}>
          Lorem and 120 others has already joined.
        </div>
        <button className={styles.btnRectParent}>
          <div className={styles.btnRect} />
          <b className={styles.label}>Get Started</b>
        </button>
        <img
          className={styles.heroSectionChild}
          alt=""
          src="../group-6@2x.png"
        />
      </div>
      <header className={styles.navBar}>
        <div className={styles.rect} />
        <div className={styles.linksParent}>
          <div className={styles.links}>
            <button className={styles.home}>Home</button>
            <button className={styles.startCampaign}>Start Campaign</button>
            <button className={styles.contribute}>Contribute</button>
          </div>
          <button className={styles.btnRectGroup}>
            <button className={styles.btnRect1} />
            <b className={styles.label1}>Log In</b>
          </button>
          <b className={styles.cryptofunder}>
            <span>Crypto</span>
            <span className={styles.fundraising}>Funder</span>
          </b>
        </div>
      </header>
      <div className={styles.whyChooseUs}>
        <b className={styles.whyChooseUs1}>Why Choose Us?</b>
        <div className={styles.securityParent}>
          <b className={styles.security}>{`Security `}</b>
          <img className={styles.vectorIcon} alt="" src="../vector.svg" />
          <div className={styles.cryptofunderUsesBlockchain}>
            Cryptofunder uses blockchain technology, which provides an extremely
            secure way of managing transactions. It uses cryptographic
            algorithms to secure data, ensuring that it cannot be tampered with.
          </div>
        </div>
        <div className={styles.decentralisationParent}>
          <b className={styles.decentralisation}>Decentralisation</b>
          <div className={styles.cryptofunderIsDecentralised}>
            Cryptofunder is decentralised, which means that it is not controlled
            by any central authority or intermediary. This enhances transparency
            and trust between participants, while reducing the risk of fraud.
          </div>
          <img className={styles.groupChild} alt="" src="../group-13.svg" />
        </div>
        <div className={styles.smartContractsParent}>
          <b className={styles.smartContracts}>Smart Contracts</b>
          <div className={styles.cryptofunderCanUse}>
            Cryptofunder can use smart contracts to automate the fundraising
            process. This can reduce the risk of errors, increase the efficiency
            of the fundraising process, and eliminate the need for
            intermediaries.
          </div>
          <img className={styles.vectorIcon1} alt="" src="../vector1.svg" />
        </div>
        <div className={styles.accountabilityParent}>
          <b className={styles.accountability}>Accountability</b>
          <div className={styles.theTransparencyAnd}>
            The transparency and traceability provided by blockchain technology
            ensures that all participants are accountable for their actions.
            This can help to reduce the risk of fraud and increase the
            likelihood of success for crowdfunding campaigns.
          </div>
          <img className={styles.vectorIcon2} alt="" src="../vector2.svg" />
        </div>
        <div className={styles.tokenisationParent}>
          <b className={styles.accountability}>Tokenisation</b>
          <div className={styles.cryptofunderCanUse1}>
            Cryptofunder can use tokenisation to create a new asset class that
            can be traded on blockchain-based exchanges. This can provide new
            investment opportunities for contributors and increase liquidity for
            fundraisers.
          </div>
          <img className={styles.subtractIcon} alt="" src="../subtract.svg" />
          <img className={styles.groupItem} alt="" src="../ellipse-11.svg" />
        </div>
        <div className={styles.governanceParent}>
          <b className={styles.accountability}>Governance</b>
          <div className={styles.cryptofunderCanUse2}>
            {" "}
            Cryptofunder can use blockchain-based governance systems to give
            participants a say in how the platform is run. This can increase
            trust and transparency, and help to ensure that the platform serves
            the interests of its participants.
          </div>
          <img className={styles.vectorIcon3} alt="" src="../vector3.svg" />
        </div>
      </div>
      <div className={styles.watchOnYoutube}>
        <div className={styles.watchOnYoutubeChild} />
        <b className={styles.democratizingAccessTo}>
          Democratizing access to capital for creators, innovators and the needy
        </b>
        <div className={styles.helpingBringGameChanging}>
          Helping bring game-changing solutions to the most pressing social and
          environmental issues...
        </div>
        <div className={styles.learnMore}>Learn More</div>
        <img
          className={styles.maskGroupIcon1}
          alt=""
          src="../mask-group1@2x.png"
        />
        <video className={styles.wrapper} controls>
          <source />
        </video>
        <img className={styles.image7Icon} alt="" src="../image-7@2x.png" />
        <b className={styles.theFutureOf}>The future of Fundraising is here.</b>
        <div className={styles.watchOnYoutube1}>Watch on Youtube</div>
      </div>
      <div className={styles.testimonials}>
        <b className={styles.whatOurCustomers}>What Our Customers Says</b>
        <div className={styles.rectangleParent}>
          <div className={styles.groupInner} />
          <img
            className={styles.maskGroupIcon2}
            alt=""
            src="../mask-group2@2x.png"
          />
          <img className={styles.icon} alt="" src="../.svg" />
          <div className={styles.cryptofunderGaveMe}>
            CryptoFunder gave me the first break into Ethereum and the crypto
            space. It helped me find bounties that I could work on and get paid
            in crypto. After my first ever bounty I got paid a lot and I felt
            euphoric.
          </div>
        </div>
        <div className={styles.rectangleGroup}>
          <div className={styles.rectangleDiv} />
          <img
            className={styles.maskGroupIcon3}
            alt=""
            src="../mask-group3@2x.png"
          />
          <img className={styles.icon1} alt="" src="../1.svg" />
          <div className={styles.iLoveItthe}>
            I LOVE IT...The community has been outstanding. I have made contact
            outside of slack w a couple of people. William Schwab was kind
            enough to ZOOM w me for an hour and tell me his story.
          </div>
        </div>
        <div className={styles.rectangleContainer}>
          <div className={styles.rectangleDiv} />
          <img
            className={styles.maskGroupIcon2}
            alt=""
            src="../mask-group4@2x.png"
          />
          <img className={styles.icon1} alt="" src="../1.svg" />
          <div className={styles.iAmAmazed}>
            I am amazed on a daily basis at the incredible projects and
            communities in this space. The CryptoFunder team and quadratic
            funding is an invaluable catalyst to bring it all to fruition. Thank
            you!
          </div>
        </div>
      </div>
      <div className={styles.readyToGetStarted}>
        <div className={styles.readyToGetStartedChild} />
        <b className={styles.readyToGet}>Ready to get started?</b>
        <div className={styles.doYouHave}>
          Do you have a project that needs funding or do you want to explore
          awesome projects and be part of their community?
        </div>
        <button className={styles.btnRectContainer}>
          <input className={styles.btnRect2} type="text" />
          <b className={styles.label2}>Get Started Now</b>
        </button>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerChild} />
        <div className={styles.cryptofunderAllRights}>
          © CryptoFunder. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default WebsiteTech;
