'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/layout/Navbar'

export default function ContactPage() {
  const [eventType, setEventType] = useState('boda')

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Image Section - Static */}
        <div className="relative hidden lg:block h-screen sticky top-0 mt-32">
          <Image
            src="/images/necesidad.png"
            alt="Wedding venue setup"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Form Section - Scrollable */}
        <div className="px-4 sm:px-8 lg:px-16 pb-12 lg:pb-16 min-h-screen bg-white mt-32">
          <div className="max-w-2xl mx-auto">
            <h1 className="font-romans text-4xl sm:text-5xl lg:text-6xl mb-6 text-secondary">
              CONTACTO
            </h1>

            <p className="font-geologica text-secondary/80 mb-12 leading-relaxed">
              The Wedding Project tiene como objetivo ofrecer a nuestros novi@s la mejor experiencia en servicio, coordinación, planeación y apoyo, por lo mismo seleccionamos a un equipo adecuado a tus necesidades.
            </p>

            <form className="space-y-8">
              {/* Two Column Layout */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-geologica text-sm text-secondary/80">
                    Nombre
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-geologica text-sm text-secondary/80">
                    Nombre de pareja
                  </label>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                  />
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-geologica text-sm text-secondary/80">
                    Whatsapp de Contacto
                  </label>
                  <input
                    type="tel"
                    placeholder="+52 8119163521"
                    className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-geologica text-sm text-secondary/80">
                    Correo
                  </label>
                  <input
                    type="email"
                    placeholder="gerardo@gmail.com"
                    className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                  />
                </div>
              </div>

              {/* Single Column Fields */}
              <div className="space-y-2">
                <label className="block font-geologica text-sm text-secondary/80">
                  Tu eres...
                </label>
                <select className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none appearance-none text-secondary">
                  <option value="" className="bg-white">Novio</option>
                  <option value="novia" className="bg-white">Novia</option>
                  <option value="familiar" className="bg-white">Familiar</option>
                  <option value="amigo" className="bg-white">Amigo</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block font-geologica text-sm text-secondary/80">
                  Selecciona el evento que te gustaría cotizar
                </label>
                <select 
                  className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none appearance-none text-secondary"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="boda" className="bg-white">Boda</option>
                  <option value="propuesta" className="bg-white">Propuesta</option>
                  <option value="despedida" className="bg-white">Despedida</option>
                  <option value="civil" className="bg-white">Civil</option>
                  <option value="pedida" className="bg-white">Pedida de mano</option>
                  <option value="otro" className="bg-white">Otro</option>
                </select>
              </div>

              {/* Conditional Fields */}
              {eventType === 'boda' ? (
                <>
                  <div className="space-y-2">
                    <label className="block font-geologica text-sm text-secondary/80">
                      Fecha de tu boda
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary"
                    />
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="radio" name="date_type" value="tentative" className="text-primary border-secondary/20" />
                        Tentativa
                      </label>
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="radio" name="date_type" value="optional" className="text-primary border-secondary/20" />
                        Opcional
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-geologica text-sm text-secondary/80">
                      Ciudad y Estado donde será tu boda
                    </label>
                    <input
                      type="text"
                      placeholder="Ciudad o estado"
                      className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                    />
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="radio" name="location_type" value="tentative" className="text-primary border-secondary/20" />
                        Tentativa
                      </label>
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="radio" name="location_type" value="optional" className="text-primary border-secondary/20" />
                        Opcional
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-geologica text-sm text-secondary/80">
                      Salón / Lugar de tu boda
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del lugar"
                      className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                    />
                    <div className="flex gap-6 mt-2">
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="radio" name="venue_type" value="tentative" className="text-primary border-secondary/20" />
                        Tentativa
                      </label>
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="radio" name="venue_type" value="optional" className="text-primary border-secondary/20" />
                        Opcional
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-geologica text-sm text-secondary/80">
                      Número de invitados (aproximado)
                    </label>
                    <input
                      type="number"
                      placeholder="Número de invitados"
                      className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block font-geologica text-sm text-secondary/80">
                      ¿Qué servicios te interesan para tu boda? *Selecciona las que apliquen
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="checkbox" className="text-primary border-secondary/20" />
                        Coordinación día de la boda (solo el día del evento)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="checkbox" className="text-primary border-secondary/20" />
                        Planeación (coordinación meses / semanas antes de la boda)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="checkbox" className="text-primary border-secondary/20" />
                        Asesoría para tu boda (sesiones unitarias de apoyo, creativas y/o planeación)
                      </label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="block font-geologica text-sm text-secondary/80">
                      Fecha del evento
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block font-geologica text-sm text-secondary/80">
                      Lugar del evento
                    </label>
                    <input
                      type="text"
                      placeholder="Lugar del evento"
                      className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="block font-geologica text-sm text-secondary/80">
                      ¿Qué servicios te interesan? *Selecciona las que apliquen
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="checkbox" className="text-primary border-secondary/20" />
                        Coordinación (Solo el día del evento)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="checkbox" className="text-primary border-secondary/20" />
                        Planeación (Coordinación meses/semanas antes del evento)
                      </label>
                      <label className="flex items-center gap-2 text-sm text-secondary/80">
                        <input type="checkbox" className="text-primary border-secondary/20" />
                        Asesoría para tu evento (Sesiones unitarias de apoyo, creativas y/o planeación)
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block font-geologica text-sm text-secondary/80">
                      Platicanos la idea del evento
                    </label>
                    <textarea
                      placeholder="Describe tu idea..."
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border-b border-secondary/20 focus:border-primary transition-colors outline-none text-secondary placeholder:text-secondary/50"
                    />
                  </div>
                </>
              )}

              {/* Presupuesto Section - Always visible */}
              <div className="space-y-4 pt-8">
                <h2 className="font-geologica text-lg text-secondary">
                  Presupuesto
                </h2>
                <p className="text-sm text-secondary/80">
                  Uno de nuestros principales objetivos es la optimización de presupuesto y recursos de nuestros novios, sabemos que cada quien necesita cosas diferentes. Debido a nuestra flexibilidad y versatilidad en recursos podemos hacer una cotización muy alineada a tu presupuesto.
                </p>

                <div className="space-y-4">
                  <label className="block font-geologica text-sm text-secondary/80">
                    ¿Tienes definido un presupuesto nuestros servicios (Planeación + Coordinación día del evento)?
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 text-sm text-secondary/80">
                      <input type="radio" name="has_budget" value="yes" className="text-primary border-secondary/20" />
                      Sí
                    </label>
                    <label className="flex items-center gap-2 text-sm text-secondary/80">
                      <input type="radio" name="has_budget" value="no" className="text-primary border-secondary/20" />
                      No
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block font-geologica text-sm text-secondary/80">
                    Si tu respuesta fue NO ¿Aproximadamente cuánto estarías dispuesto a pagar por los servicios seleccionados?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-secondary/80">
                      <input type="radio" name="budget_range" value="15-30" className="text-primary border-secondary/20" />
                      Entre $15,000 - $30,000
                    </label>
                    <label className="flex items-center gap-2 text-sm text-secondary/80">
                      <input type="radio" name="budget_range" value="30-50" className="text-primary border-secondary/20" />
                      Entre $30,001 - $50,000
                    </label>
                    <label className="flex items-center gap-2 text-sm text-secondary/80">
                      <input type="radio" name="budget_range" value="50+" className="text-primary border-secondary/20" />
                      Más de $50,001
                    </label>
                    <label className="flex items-center gap-2 text-sm text-secondary/80">
                      <input type="radio" name="budget_range" value="other" className="text-primary border-secondary/20" />
                      Otro
                    </label>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-8">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-12 py-4 bg-primary text-white font-geologica tracking-[0.2em] hover:bg-white hover:text-secondary transition-colors duration-300 text-sm"
                >
                  COTIZAR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
} 