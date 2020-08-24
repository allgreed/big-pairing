import os
import sys
from functools import partial

import requests


# TODO: naming in this file

try:
    with open("./sendgrid-api-key") as f:
        SENDGRID_API_KEY = f.read().strip()
        SENDGRID_SANDBOX = False
except FileNotFoundError:
        print(f"The ./sendgrid-api-key secret was not mounted, falling back to sandbox mode", file=sys.stderr)
        SENDGRID_API_KEY = ""
        SENDGRID_SANDBOX = True


def send_registration_email(nickname, address, send_email):
    subject = f"Thank you, {nickname}, for joining us!"
    content = "You're all set"

    return send_email(to=address, subject=subject, content=content)

# send_email_provider => String, String, String => ()

def sendgrid_send_email(to, subject, content, requests, sendgrid_api_key, is_sandbox=True):
    # TODO: reformat this
    payload = {
      "personalizations": [{
        "to": [{
          "email": to,
        }]
      }],
      "from": {
        "email": "bp@allgreed.pl",
      },
      "subject": subject,
      "content": [{
        "type": "text/plain",
        "value": content,
      }],
        "mail_settings": {
            "sandbox_mode": {
                    "enable": is_sandbox,
            },
        },
    }

    headers = {
        "Authorization": f"Bearer {sendgrid_api_key}",
        "Content-Type": "application/json",
    }

    r = requests.post("https://api.sendgrid.com/v3/mail/send", json=payload, headers=headers)
    # TODO: how to get the info if there is something wrong with the email - ex request went through, but the email was not sent?

    if not is_sandbox: # TODO: unfuck this - have a propper null email provider
        r.raise_for_status()
    return r


def get_email_provider():
    email_provider = partial(sendgrid_send_email, requests=requests, sendgrid_api_key=SENDGRID_API_KEY, is_sandbox=SENDGRID_SANDBOX)
    yield email_provider
