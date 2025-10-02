"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"
import { useScrollFade } from "@/hooks/use-scroll-animation"

export function Contact() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollFade()
  const { ref: contactRef, isVisible: contactVisible } = useScrollFade()
  const { ref: formRef, isVisible: formVisible } = useScrollFade()

  const contactInfo = [
    {
      icon: Mail,
      label: "Email", // Translated to English
      value: "hsanellouz@gmail.com",
      href: "mailto:hsanellouz@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone", // Translated to English
      value: "+216 95 112 002",
      href: "tel:+21695112002",
    },
    {
      icon: MapPin,
      label: "Location", // Translated to English
      value: "Tunis, Tunisia", // Translated to English
      href: "#",
    },
  ]

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Hsan003",
      username: "@Hsan003",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/hsanellouze",
      username: "hsanellouze",
    },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-800 transform ${
            headerVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-balance mb-6">Contact Me</h2>
          <p className="text-lg text-muted-foreground">Interested in my profile? Feel free to reach out!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div
            ref={contactRef}
            className={`space-y-8 transition-all duration-800 transform ${
              contactVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-[-50px] scale-95"
            }`}
          >
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 transition-all duration-500 hover:scale-105 ${
                      contactVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-20px]"
                    }`}
                    style={{
                      transitionDelay: contactVisible ? `${index * 150}ms` : "0ms",
                    }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center animate-pulse-glow">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{item.label}</div>
                      <a href={item.href} className="font-medium hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6">Social Networks</h3>
              <div className="space-y-4">
                {socialLinks.map((link, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 transition-all duration-500 hover:scale-105 ${
                      contactVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-20px]"
                    }`}
                    style={{
                      transitionDelay: contactVisible ? `${(index + 3) * 150}ms` : "0ms",
                    }}
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center animate-pulse-glow">
                      <link.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">{link.label}</div>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-primary transition-colors"
                      >
                        {link.username}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            ref={formRef}
          >
          <Card
            className={`hover:shadow-lg transition-all duration-800 hover:scale-105 transform ${
              formVisible ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-[50px] scale-95"
            }`}
          >
            <CardHeader>
              <CardTitle>Send me a message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input placeholder="Your name" className="hover:animate-scale-in transition-all duration-300" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="hover:animate-scale-in transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="Message subject" className="hover:animate-scale-in transition-all duration-300" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  placeholder="Your message..."
                  className="min-h-[120px] hover:animate-scale-in transition-all duration-300"
                />
              </div>
              <Button className="w-full animate-pulse-glow hover:scale-105 transition-all duration-300">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
