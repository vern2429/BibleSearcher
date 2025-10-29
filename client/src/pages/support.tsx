import { Book, Heart, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Support() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const walletAddresses = [
    {
      name: "Dogecoin (DOGE)",
      address: "D5v5XmwpD7jtiyMSpij9ucRUiHLhuuVxRn",
      color: "bg-yellow-50 border-yellow-200",
      iconBg: "bg-yellow-600",
      textColor: "text-yellow-600"
    },
    {
      name: "Bitcoin (BTC)",
      address: "1FK5mCWPagaZdt7eQbFMADrgMQ7eesm3SX",
      color: "bg-orange-50 border-orange-200",
      iconBg: "bg-orange-600",
      textColor: "text-orange-600"
    },
    {
      name: "Litecoin (LTC)",
      address: "LUGcHDf7xp6G1zKycR7zsGfAAMiDtF1LRX",
      color: "bg-blue-50 border-blue-200",
      iconBg: "bg-blue-600",
      textColor: "text-blue-600"
    },
    {
      name: "USDT (BNB Bep20)",
      address: "0x68d00e53073ACbcbc0655AB9c062e868caffEbA0",
      color: "bg-green-50 border-green-200",
      iconBg: "bg-green-600",
      textColor: "text-green-600"
    }
  ];

  const copyToClipboard = (address: string, name: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopiedAddress(address);
      toast({
        title: "Address copied!",
        description: `${name} address copied to clipboard`,
      });
      setTimeout(() => setCopiedAddress(null), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Book className="text-blue-600 text-xl" />
              <h1 className="text-xl font-bold text-gray-900">BibleSearcher</h1>
            </div>
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-table-of-contents">
                Table of Contents
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="text-center mb-8">
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Support BibleSearcher</h1>
            <p className="text-lg text-gray-600">
              Help keep this Bible study app free and accessible for everyone
            </p>
          </div>

          {/* Why Support Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Your Support Matters</h2>
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <p className="text-gray-700 mb-4">
                BibleSearcher is completely free to use and will always remain free. We believe everyone should have access to God's Word without barriers. Your generous support helps us:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Keep the app running and maintained</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Add new features and improvements</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Cover hosting and server costs</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Ensure fast and reliable service</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Support development time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptocurrency Donation Addresses */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Cryptocurrency Donations</h2>
            <p className="text-gray-600 mb-6">
              You can support us by sending cryptocurrency to any of the following addresses. Click the copy button to copy the address to your clipboard.
            </p>
            
            <div className="space-y-4">
              {walletAddresses.map((wallet) => (
                <div 
                  key={wallet.name}
                  className={`${wallet.color} border rounded-lg p-4`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-semibold ${wallet.textColor} mb-2`}>
                        {wallet.name}
                      </h3>
                      <div className="bg-white rounded px-3 py-2 font-mono text-sm break-all text-gray-800">
                        {wallet.address}
                      </div>
                    </div>
                    <Button
                      onClick={() => copyToClipboard(wallet.address, wallet.name)}
                      className={`${wallet.iconBg} hover:opacity-90 text-white flex-shrink-0`}
                      size="sm"
                      data-testid={`button-copy-${wallet.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      {copiedAddress === wallet.address ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Please ensure you're sending to the correct network. For USDT, we only accept deposits on the BNB Smart Chain (BEP20) network.
              </p>
            </div>
          </div>

          {/* Alternative Support */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Other Ways to Help</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Share with Others</h4>
                <p className="text-gray-700 mb-4">
                  Tell your church, Bible study group, or friends about BibleSearcher. Word of mouth is invaluable.
                </p>
                <Button 
                  variant="outline" 
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                  data-testid="button-share-app"
                >
                  Share App
                </Button>
              </div>
              <div className="bg-orange-50 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-2">Pray for Us</h4>
                <p className="text-gray-700 mb-4">
                  We value your prayers for wisdom in development and that this tool would bless many lives.
                </p>
                <div className="text-orange-600 font-medium">
                  "Commit your work to the Lord, and your plans will be established." - Proverbs 16:3
                </div>
              </div>
            </div>
          </div>

          {/* Transparency */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Commitment</h3>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Always Free</h4>
              <p className="text-gray-700">
                BibleSearcher will always be free to use. We believe access to God's Word should never require payment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
