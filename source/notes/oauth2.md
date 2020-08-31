# OAuth 2.0

> https://www.youtube.com/watch?v=t18YB3xDfXI

Their app sets up a way to leverage information from other apps, in most cases, it's just your email address, as you're allowing them to act as your security/login provider.

In that case, something like Grammarly lets you ask Google to hand out a token for them to use when they need to log you in. That way you can use Google to log in without having to create a new login for Grammarly. You can also tell Google to revoke access to Grammarly, should Grammarly happen to do something you don't like, and no longer want to share your information with them.

Grammarly only accesses your email address bc they're only using Google to login, but something that's using your contact list, may be something you'd like to revoke later. Some services like Gitkraken, the Git manager can ask Github for access to your repos. Gitkraken can use OAuth2 to get that information without having to use your actual credentials to do so. And you can log into Github later to revoke that access if you'd like.

---

## Terms

- **Resource Owner:** The user who owns the identity. E.g., me.
- **Client:** Application that wants to do things on your behalf. E.g., Gitkraken
- **Authoization Server:** Application that knows the _Resource Owner._ E.g., Github
- **Resource Server:** API the Client wants to use to interface with the _Authorization Server._ Might be a 3rd party service the _Authorization Service_ trusts. If They use Okta for their Identity Management, they could point the Client to this 3rd party for the information they need.
- **Redirect URI:** The URL the Autorization Server will send the Client to after authorization is complete. Sometiems called the _Callback URL_
- **Response Type:** The kind of information the _Client_ expects to receive. Most commonly: Code. The Authoziation Code they're going to receive.
- **Scope:** The granular permissions the Client wants. E.g., access to data or to perform actions.
- **Consent:** Takes the Scopes provided by the Resource Server and asks the Resource Owner if they would like to give permission to the Client.
- **Client ID:** Unique ID used to identify the Client with the Authorization Server.
- **Client Secret:** Secret password the Client shares with the Authoziation Server to prove they are who they say they are.
- **Authoziation Code:** A short lived temporary code the Auth Server sends back to the Client. Who sends it back to the Auth Server with the Client Secret. They then get an Access Token from the Auth Server that they use to communicate with the Resource Server.

---

## Basic Flow

1. The _Resource Owner_ initiates an access request (OAuth2 flow) for data on the _Authoization Service_ with the _Client_
2. _Client_ sends it's _Client ID_, _Redirect URI_, _Response Type_, and _Scopes_ to the _Authorization Server_.
3. _Auth Server_ checks if _Resource Owner_ has an active session. If not, _RO_ is prompted to authenticate.
4. _Auth Server_ provides consent form for the _Scopes_ requested by _Client_.
5. _Auth Server_ redirects back to _Client_ (_Redirect URI_) and sends you back with an _Authoization Code_ (coupon for 1 _Access Token_)
6. _Client_ then contacts _Auth Server_ directly (not using RO's browser) with _Authorization Code_ (coupon), _Client ID_, and _Client_ Secret to get an _Access Token_.
7. _Client_ then keeps that _Access Token_ and uses it to get data from the _Resource Server_.

---

## OIDC

A thin layer that sits on top of OAuth2 to change the relationship of the exchange a little bit. Instead of requesting data the RO has agreed to release. Instead of just making your contacts or some other data available, the Authorization Server will ensure the user is logged in, and in response to a valid login/session, will provide the same Access Code, that is exchanged for information about the user where before, an Access Token was returned with the idea that it'd be used later to access data at the Resource Server.

This creates a session with the user/RO on the Client and provides Authentication of who the RO says they are. They also gain information about the RO, called identity.

When an Auth Server supports OIDC, it is often called an Identity Provider.

This enables a scenario where a single Auth Server serves as an Identity Provider across many Clients. This is SSO, or Single Sign On.

In OIDC, you're making a normal OAuth2 request, where the Scope includes `oidc`. When this happens, the Auth Server returns not only an Access Token, but an ID Token. The Access Token allows you to do things on the Auth Server or Resource Server. The ID Token is different in that it's a JSON Web Token or JWT. The ID Token/JWT is essentially an encoded wrapper for the OIDC response information about the Resource Owner.

These are easily decoded to find information like: Issued By, Issued At, Expiration, and User ID. The data inside the ID Token are called _Claims_. OIDC also allows the Client to request additional information like Email Address and other profile information from the Auth Server/Resource Server using the Access Token.

### Analogy

ATM. The ATM is the Client. It's job is to access data at your bank. Your bank card acts as your Token. It has information about you and allows the ATM to pull information about you from your bank and perform other actions. But for that to work, the ATM has to have developed a relationship with your bank beforehand.

---
## PKCE "pixie" Flow

The above flow is the PKCE flow. Without it, you're left with the Implicit Flow, where the Client just gets the Tokens through the URL when browser redirects you back to the Client app.

This type of "in-client" authentication flow has a pretty serious set of security issues associated with it and from Nov 2018 on, the PKCE Flow is recommended for most SPAs doing authentication on their own without a backend to do the security. In this flow, as described above, the Client is given an Auth Code (voucher of sorts) to redeem with the Auth Server in exchange for a real Token to be used with the Resource Server.