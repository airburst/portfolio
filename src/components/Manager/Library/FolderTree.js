import React from 'react';
import {Treebeard} from 'react-treebeard';

const treeStyles = {
  tree: {
      base: {
          listStyle: 'none',
          backgroundColor: 'transparent',
          margin: 0,
          padding: 0,
          color: '#a6a6a6',
      },
      node: {
          base: {
              position: 'relative'
          },
          link: {
              cursor: 'pointer',
              position: 'relative',
              padding: '0px 5px',
              display: 'flex'
          },
          activeLink: {
              background: '#333'
          },
          toggle: {
              base: {
                  position: 'relative',
                  display: 'inline-block',
                  verticalAlign: 'top',
                  marginLeft: '-5px',
                  height: '24px',
                  width: '24px'
              },
              wrapper: {
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  margin: '-7px 0 0 -7px',
                  height: '14px'
              },
              height: 14,
              width: 14,
              arrow: {
                  fill: '#a6a6a6',
                  strokeWidth: 0
              }
          },
          header: {
              base: {
                  display: 'inline-block',
                  verticalAlign: 'top',
                  color: '#a6a6a6'
              },
              connector: {
                  width: '2px',
                  height: '12px',
                  borderLeft: 'solid 2px black',
                  borderBottom: 'solid 2px black',
                  position: 'absolute',
                  top: '0px',
                  left: '-21px'
              },
              title: {
                  lineHeight: '24px',
                  verticalAlign: 'middle'
              }
          },
          subtree: {
              listStyle: 'none',
              paddingLeft: '19px'
          },
          loading: {
              color: '#E2C089'
          }
      }
  }
};

// TODO: Get this data from a server method getAlbums()
const data = {
  name: 'ALBUMS',
  toggled: true,
  children: [
    {
      name: 'Lakes 2012',
    },
    {
      name: 'Alps 2015',
    }
  ]
};

class FolderTree extends React.Component {
  state = {};

  // onToggle(node, toggled) {
  //   if (this.state.cursor) { this.state.cursor.active = false; }
  //   const setSelected = () => {
  //     node.active = true;
  //     if (node.children) { node.toggled = toggled; }
  //     // TODO: Emit node.name to state
  //     this.setState({ cursor: node }, () => console.log(this.state));
  //   };

  //   if (this.state.cursor) {
  //     this.setState((state) => ({}), () => setSelected());
  //   } else {
  //     setSelected();
  //   }
  // }

  onToggle(node, toggled) {
    const {cursor} = this.state;
    if (cursor) { cursor.active = false; }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    } else {
      // TODO: Emit node.name to state
      console.log(node.name)
    }
    this.setState({ cursor: node });
}

  render() {
    return (
      <Treebeard
        data={data}
        style={treeStyles}
        onToggle={this.onToggle.bind(this)}
      />
    );
  }
}

export default FolderTree;
