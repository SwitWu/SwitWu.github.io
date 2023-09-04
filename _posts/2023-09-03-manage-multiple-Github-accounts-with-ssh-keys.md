---
layout: post
title: Manage multiple Github accounts with SSH keys
category: computer
description: 
lang: en-US
---

We can access and write data in repositories on Github.com using SSH (Secure Shell Protocol). When we connect via SSH, we authenticate using a private key file on our local machine. For more information about SSH, see [Secure Shell](https://en.wikipedia.org/wiki/Secure_Shell) on Wikipedia.

## Generate new SSH keys

1. Open terminal
2. Paste the text below, substituting the email with your own Github email address.
   ```sh
   ssh-keygen -t ed25519 -C "your_email@example.com"
   ```
   This will create a new SSH key, using the provided email as a label. When you're prompted to "Enter a file in which to save the key", you can press Enter to accept the default file location. Please note that if you created SSH keys previously, ssh-keygen may ask you to rewrite another key, in which case we strongly recommend creating a custom-named SSH key. To do so, type the default file location and replace id_ssh_keyname with your custom key name (such as `id_ed25519_userA` and `id_ed25519_userB`).
3. At the prompt, type a secure passphrase.
   ```sh
   > Enter passphrase (empty for no passphrase): [Type a passphrase]
   > Enter same passphrase again: [Type passphrase again]
   ```


## Adding SSH key to the ssh-agent

1. Start the ssh-agent in the background.
   ```sh
   $ eval "$(ssh-agent -s)"
   > Agent pid 59566
   ```
2. Check the file `~/.ssh/config` exists or not. If not, use `touch ~/.ssh/config` to create it.
3. Configure the file `~/.ssh/config`. To demonstrate, suppose we have generated the following two SSH keys
   ```sh
   ~/.ssh/id_ed25519_userA
   ~/.ssh/id_ed25519_userB
   ```
   They correspond to two different email addresses. Edit the `~/.ssh/config` as follows:
   ```sh
   # Default Github account
   Host github.com
      HostName github.com
      User git
      AddKeysToAgent yes
      IdentityFile ~/.ssh/id_ed25519_userA
   # Another Github account
   Host userB.github.com
      HostName github.com
      User git
      AddKeysToAgent yes
      IdentityFile ~/.ssh/id_ed25519_userB
   # repeat for as many keys/identities as you like, and name the `Host` and key files whatever works best for you
   ```
   Note that the second Host `userB.github.com` is used to differentiate multiple Github accounts. You can also use `github.com-userB` as well. However, please make sure you are consistent with the notation since this is relevant when you clone a repository or set the remote origin for a local repository (see the below sections for details).
4. Add the SSH keys to the ssh-agent.
   ```sh
   ssh-add ~/.ssh/id_ed25519_userA
   ssh-add ~/.ssh/id_ed25519_userB
   ```
5. Add the SSH public key to your account on Github. See "[Adding a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)."

## Clone a repository as different users

By default, we clone a repository in the following way:
```bash
git clone git@github.com:owner/repo.git
```
On cloning, note that we use the host names that we have set in `~/.ssh/config`. Since in this case the string between `@` and `:` is `github.com`, we are cloning the repository `repo` as `userA` using the identity file `~/.ssh/id_ed25519_userA`.

If you want to clone the `repo` as `userB`, you need to modify the clone command to
```sh
git clone git@userB.github.com:owner/repo.git
```
The string between `@` and `:` should match what we have given in the SSH config file.

## Setting remote url for existing repositories

To list the Git remote of a repository, use `git remote -v`. We can set the git URL as follows:

```sh
git remote set-url origin git@userB.github.com:owner/repo.git
```

If you find this command is hard to remember, you can also open `.git/config` file in the repository by your favorite editor and modify the `url` item there.

## References

1. [Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
2. [How to manage multiple GitHub accounts on a single machine with SSH keys](https://www.freecodecamp.org/news/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca)