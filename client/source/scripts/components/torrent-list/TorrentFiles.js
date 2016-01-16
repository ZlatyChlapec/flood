import React from 'react';

import FolderOpenSolid from '../icons/FolderOpenSolid';
import DirectoryTree from './DirectoryTree';
import File from '../icons/File';

export default class TorrentFiles extends React.Component {
  constructDirectoryTree(tree = {}, directory, file, depth = 0) {
    if (depth < file.pathComponents.length - 1) {
      depth++;
      tree[directory] = this.constructDirectoryTree(
        tree[directory],
        file.pathComponents[depth],
        file,
        depth
      );
    } else {
      if (!tree.files) {
        tree.files = [];
      }
      tree.files.push(file);
    }
    return tree;
  }

  getFileList(files) {
    let tree = {};

    files.forEach((file) => {
      this.constructDirectoryTree(tree, file.pathComponents[0], file);
    });

    return <DirectoryTree tree={tree} depth={0} />;
  }

  getFileData(torrent, files) {
    let parentDirectory = torrent.directory;
    let filename = torrent.filename;

    if (files) {
      // We've received full file details from the client.
      return (
        <div className="directory-tree torrent-details__section">
          <div className="directory-tree__node directory-tree__parent-directory">
            <FolderOpenSolid />
            {parentDirectory}
          </div>
          {this.getFileList(files)}
        </div>
      );
    } else {
      // We've only received the top-level file details from the torrent list.
      return (
        <div className="directory-tree torrent-details__section">
          <div className="directory-tree__node directory-tree__parent-directory">
            <FolderOpenSolid />
            {parentDirectory}
          </div>
          <div className="directory-tree__node directory-tree__node--file">
            <File />
            {filename}
          </div>
        </div>
      );
    }
  }

  render() {
    return this.getFileData(this.props.torrent, this.props.files);
  }
}
