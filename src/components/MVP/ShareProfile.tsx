import React, { useState } from "react";
import { 
  LinkIcon, 
  ClipboardIcon, 
  ChatBubbleLeftIcon,
  EnvelopeIcon 
} from "@heroicons/react/24/outline";
import { Card } from "@components/ui/Card";

interface ShareProfileProps {
  username?: string;
}

export const ShareProfile: React.FC<ShareProfileProps> = ({ username }) => {
  const [copied, setCopied] = useState(false);
  const profileUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/profile/${username}` 
    : `https://workforge-frontend.vercel.app/profile/${username}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareWhatsApp = () => {
    window.open(
      `https://wa.me/?text=Check%20out%20my%20WorkForge%20profile:%20${encodeURIComponent(profileUrl)}`,
      "_blank"
    );
  };

  const shareSMS = () => {
    const isAndroid = /android/i.test(navigator.userAgent);
    if (isAndroid) {
      window.open(`sms:?body=Check out my WorkForge profile: ${profileUrl}`);
    } else {
      window.open(`sms:&body=Check out my WorkForge profile: ${profileUrl}`);
    }
  };

  const shareEmail = () => {
    window.open(
      `mailto:?subject=Check out my WorkForge profile&body=Here's my WorkForge profile: ${profileUrl}`
    );
  };

  return (
    <div className="space-y-4">
      <p className="text-sm font-medium text-slate-700">Share your profile</p>
      
      {/* URL Copy */}
      <div className="flex gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm text-slate-600 overflow-hidden">
          <LinkIcon className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{profileUrl}</span>
        </div>
        <button
          onClick={copyToClipboard}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            copied 
              ? 'bg-green-500 text-white' 
              : 'bg-slate-800 text-white hover:bg-slate-700'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      {/* Share Buttons */}
      <div className="flex gap-2">
        <button
          onClick={shareWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
        >
          <ChatBubbleLeftIcon className="h-5 w-5" /> WhatsApp
        </button>
        <button
          onClick={shareSMS}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          <ChatBubbleLeftIcon className="h-5 w-5" /> SMS
        </button>
        <button
          onClick={shareEmail}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-300 transition-colors"
        >
          <EnvelopeIcon className="h-5 w-5" /> Email
        </button>
      </div>
    </div>
  );
};

export default ShareProfile;