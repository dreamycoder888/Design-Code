import { CloseRounded, MenuRounded } from '@mui/icons-material';
import {
  Container,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  ListItem,
  ListItemButton,
  SvgIconTypeMap,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { NAV_LINKS } from '~/lib/constants';
import { darkTheme } from '~/lib/theme';
import { clsx, isSSR } from '~/lib/utils';
import { ContainedButton } from '../common/Button';
import Link from '../common/Link';
import { MobileNavWrapper, NavbarWrapper } from './styles';

interface NavbarProps {
  items: {
    url: string;
    label: string;
    icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
    };
  }[];
}

const bgColor = darkTheme.palette.primary.backgroundBlurColor;

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const router = useRouter();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: isSSR ? undefined : window,
  });

  const navbarStyles = useMemo(
    () =>
      Object.assign(
        {
          background: `transparent`,
          backdropFilter: 'none',
        },
        trigger && {
          background: bgColor,
          backdropFilter: 'blur(20px)',
        }
      ),
    [trigger]
  );

  return (
    <NavbarWrapper position="sticky" style={navbarStyles}>
      <Container maxWidth="lg">
        <Grid container className={'nav-grid'}>
          <Grid container item xs={1}>
            <Link href="/">
              <Image
                className={'branding-logo'}
                width={300}
                height={300}
                src={'/static/branding-logos/branding-transparent-logo.svg'}
                alt="branding-logo"
              />
            </Link>
          </Grid>
          <Grid container item xs={9}>
            <Hidden mdDown>
              <div className={'nav-links'}>
                {items.map((item, index) => (
                  <div key={`link-index-${index}`}>
                    <Link href={item.url}>
                      <Typography
                        component="span"
                        className={clsx(
                          item.url === router.pathname && 'active',
                          'nav-link'
                        )}
                        variant="subtitle1"
                      >
                        {item.label}
                      </Typography>
                    </Link>
                  </div>
                ))}
              </div>
            </Hidden>
          </Grid>
          <Grid container item xs={2}>
            <Grid item sx={{ margin: 'auto 0 auto auto' }}>
              <Hidden mdDown>
                <ContainedButton
                  href="https://discord.gg/gM3bG4rAU5"
                  sx={{ paddingX: '1.5rem', paddingY: '0.6rem' }}
                  LinkComponent={Link}
                >
                  Join Us
                </ContainedButton>
              </Hidden>
              <Hidden mdUp>
                <IconButton
                  className={'menu-btn'}
                  onClick={() => setIsDrawerOpen((p) => !p)}
                >
                  <MenuRounded />
                </IconButton>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <MobileDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </NavbarWrapper>
  );
};

type MobileDrawerProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MobileDrawer: FC<MobileDrawerProps> = ({ isOpen, setIsOpen }) => {
  const { pathname } = useRouter();

  return (
    <Drawer anchor={'right'} open={isOpen} onClose={() => setIsOpen(false)}>
      <MobileNavWrapper>
        <ListItem>
          <Typography
            sx={{ cursor: 'pointer' }}
            onClick={() => setIsOpen(false)}
          >
            <CloseRounded />
          </Typography>
        </ListItem>
        <ListItem sx={{ marginBottom: '2rem' }}>
          <div>
            <div className={'logo-sidebar'}>
              <Image
                width={75}
                height={75}
                src={'/static/branding-logos/branding-transparent-logo.svg'}
                alt="branding-logo"
              />
            </div>
            <div>
              <Typography variant="h4" className={'branding-title'}>
                Design And Code
              </Typography>
              <Typography variant="subtitle2">
                Connect, Collaborate, Comprehend
              </Typography>
            </div>
          </div>
        </ListItem>
        {NAV_LINKS.map((data, i) => (
          <React.Fragment key={i}>
            <Link href={data.url} onClick={() => setIsOpen(false)}>
              <ListItemButton
                className={clsx(
                  data.url === pathname && 'list-item-highlighted',
                  'list-item'
                )}
              >
                <Typography className={'list-icon'}>
                  <data.icon />
                </Typography>
                <Typography variant="subtitle1">{data.label}</Typography>
              </ListItemButton>
            </Link>
            <Divider className={'divider'} />
          </React.Fragment>
        ))}
        <ListItem>
          <ContainedButton
            fullWidth
            href="https://discord.gg/gM3bG4rAU5"
            LinkComponent={Link}
          >
            <Typography variant="h6">Join Discord</Typography>
          </ContainedButton>
        </ListItem>
      </MobileNavWrapper>
    </Drawer>
  );
};

export default Navbar;
