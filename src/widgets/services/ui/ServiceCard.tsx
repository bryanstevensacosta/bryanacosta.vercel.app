'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { cn } from '@/shared/lib'
import type { Service } from '../types'

interface ServiceCardProps {
  service: Service
}

// Define code segments structure with smaller pieces
const codeSegments = [
  [
    { color: 'theme4-pink', width: '40px' },
    { color: 'theme4-cyan', width: '60px' },
    { color: 'theme4-cyan', width: '80px' },
  ],
  [
    { color: 'theme4-purple', width: '70px' },
    { color: 'theme4-purple', width: '90px' },
  ],
  [
    { color: 'theme4-yellow', width: '50px' },
    { color: 'theme4-blue', width: '45px' },
    { color: 'theme4-orange', width: '35px' },
    { color: 'theme4-cyan', width: '55px' },
  ],
  [
    { color: 'theme4-cyan', width: '85px' },
    { color: 'theme4-pink', width: '95px' },
  ],
  [
    { color: 'theme4-pink', width: '50px' },
    { color: 'theme4-purple', width: '65px' },
    { color: 'theme4-yellow', width: '45px' },
  ],
  [
    { color: 'theme4-blue', width: '40px' },
    { color: 'theme4-yellow', width: '70px' },
    { color: 'theme4-orange', width: '50px' },
  ],
  [
    { color: 'theme4-orange', width: '90px' },
    { color: 'theme4-cyan', width: '60px' },
  ],
  [
    { color: 'theme4-cyan', width: '55px' },
    { color: 'theme4-pink', width: '65px' },
    { color: 'theme4-purple', width: '35px' },
  ],
  [
    { color: 'theme4-yellow', width: '75px' },
    { color: 'theme4-blue', width: '55px' },
  ],
  [
    { color: 'theme4-blue', width: '45px' },
    { color: 'theme4-orange', width: '70px' },
    { color: 'theme4-pink', width: '50px' },
  ],
  [
    { color: 'theme4-pink', width: '80px' },
    { color: 'theme4-cyan', width: '70px' },
  ],
  [
    { color: 'theme4-cyan', width: '60px' },
    { color: 'theme4-purple', width: '50px' },
    { color: 'theme4-yellow', width: '40px' },
  ],
]

export function ServiceCard({ service }: ServiceCardProps) {
  const t = useTranslations('services.cards')
  const [currentSegment, setCurrentSegment] = useState(0)

  // Calculate total segments across all lines
  const totalSegments = codeSegments.reduce((sum, line) => sum + line.length, 0)

  useEffect(() => {
    if (service.id !== 'custom-software') return

    const segmentInterval = setInterval(() => {
      setCurrentSegment((prev) => {
        if (prev >= totalSegments - 1) {
          return 0 // Reset to first segment
        }
        return prev + 1
      })
    }, 500) // 0.5s per segment

    return () => clearInterval(segmentInterval)
  }, [service.id, totalSegments])

  const cardClasses = cn(
    'card-hover-effect group relative flex flex-col rounded-xl bg-card border',
    'transition-all duration-300 ease-out',
    'hover:-translate-y-1 hover:border-[#00E68B] hover:shadow-glow',
    service.variant === 'ai' && 'ai-card',
    service.colSpan === 2 && 'lg:col-span-2',
    service.colSpan === 1 && 'lg:col-span-1',
    service.rowSpan === 2 && 'lg:row-span-2',
    service.rowSpan === 1 && 'lg:row-span-1',
    service.size === 'large' && 'min-h-[380px] justify-between p-8',
    service.size === 'medium' && 'min-h-[320px] justify-between p-6',
    service.size === 'small' && 'min-h-[180px] justify-center p-6'
  )

  return (
    <div
      className={cardClasses}
      role="article"
      aria-label={t(`${service.id}.title`)}
    >
      {/* Background image for large cards */}
      {service.backgroundImage && (
        <>
          <div
            className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: `url(${service.backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </>
      )}

      <div className="relative z-10 flex flex-col h-full justify-between">
        {/* GIF Image for specific cards */}
        {service.gifImage && (
          <div className="mb-4">
            <img
              src={service.gifImage}
              alt={t(`${service.id}.title`)}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Code Editor for custom-software card */}
        {service.id === 'custom-software' && (
          <div className="mb-6">
            <div className="editor-window">
              <div className="window-header">
                <div className="window-button btn-red"></div>
                <div className="window-button btn-yellow"></div>
                <div className="window-button btn-green"></div>
              </div>
              <div className="editor-body">
                {/* File Tree */}
                <div className="file-tree">
                  <div className="file-tree-item">
                    <div className="file-icon-square folder-icon"></div>
                    <div
                      className="file-name-line"
                      style={{ width: '60px' }}
                    ></div>
                  </div>
                  <div className="file-tree-indent">
                    <div className="file-tree-item">
                      <div className="file-icon-square folder-icon"></div>
                      <div
                        className="file-name-line"
                        style={{ width: '80px' }}
                      ></div>
                    </div>
                    <div className="file-tree-indent">
                      <div className="file-tree-item">
                        <div className="file-icon-square file-icon-active"></div>
                        <div
                          className="file-name-line file-name-active"
                          style={{ width: '70px' }}
                        ></div>
                      </div>
                      <div className="file-tree-item">
                        <div className="file-icon-square file-icon-doc"></div>
                        <div
                          className="file-name-line"
                          style={{ width: '75px' }}
                        ></div>
                      </div>
                    </div>
                    <div className="file-tree-item">
                      <div className="file-icon-square folder-icon"></div>
                      <div
                        className="file-name-line"
                        style={{ width: '50px' }}
                      ></div>
                    </div>
                    <div className="file-tree-indent">
                      <div className="file-tree-item">
                        <div className="file-icon-square file-icon-doc"></div>
                        <div
                          className="file-name-line"
                          style={{ width: '68px' }}
                        ></div>
                      </div>
                    </div>
                    <div className="file-tree-item">
                      <div className="file-icon-square file-icon-doc"></div>
                      <div
                        className="file-name-line"
                        style={{ width: '65px' }}
                      ></div>
                    </div>
                  </div>
                  <div className="file-tree-item">
                    <div className="file-icon-square folder-icon"></div>
                    <div
                      className="file-name-line"
                      style={{ width: '70px' }}
                    ></div>
                  </div>
                  <div className="file-tree-indent">
                    <div className="file-tree-item">
                      <div className="file-icon-square file-icon-doc"></div>
                      <div
                        className="file-name-line"
                        style={{ width: '80px' }}
                      ></div>
                    </div>
                  </div>
                  <div className="file-tree-item">
                    <div className="file-icon-square file-icon-doc"></div>
                    <div
                      className="file-name-line"
                      style={{ width: '90px' }}
                    ></div>
                  </div>
                </div>
                {/* Code Editor with typing animation */}
                <div className="editor-content">
                  <div className="code-lines-animated">
                    {codeSegments.map((lineSegments, lineIndex) => {
                      // Calculate how many segments have appeared before this line
                      let segmentsBefore = 0
                      for (let i = 0; i < lineIndex; i++) {
                        segmentsBefore += codeSegments[i].length
                      }

                      // Check if this line should be visible (at least one segment visible)
                      const lineVisible = currentSegment >= segmentsBefore

                      return (
                        <div
                          key={lineIndex}
                          className={`line-numbers ${lineVisible ? 'line-visible' : ''}`}
                        >
                          <span className="number"></span>
                          <div
                            style={{
                              display: 'flex',
                              gap: '8px',
                              alignItems: 'center',
                            }}
                          >
                            {lineSegments.map((segment, segmentIndex) => {
                              const segmentPosition =
                                segmentsBefore + segmentIndex
                              const isVisible =
                                currentSegment >= segmentPosition

                              return (
                                <div
                                  key={segmentIndex}
                                  className={`code-line ${segment.color} ${isVisible ? 'segment-visible' : ''}`}
                                  style={
                                    {
                                      '--segment-width': segment.width,
                                      maxWidth: segment.width,
                                    } as React.CSSProperties
                                  }
                                ></div>
                              )
                            })}
                            {/* Show cursor after the last visible segment in this line */}
                            {lineVisible &&
                              currentSegment >= segmentsBefore &&
                              currentSegment <
                                segmentsBefore + lineSegments.length && (
                                <span className="typing-cursor"></span>
                              )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header with badges only */}
        <div className="flex justify-end items-start mb-4">
          {service.badges && service.badges.length > 0 && (
            <div className="flex gap-2">
              {service.badges.map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/30 bg-primary/5 rounded-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="material-symbols-outlined text-2xl text-muted-foreground group-hover:text-[#00E68B] transition-colors icon-glow"
              aria-label={`${t(`${service.id}.title`)} icon`}
            >
              {service.icon}
            </span>
            <h3 className="text-xl font-bold group-hover:text-[#00E68B] transition-colors">
              {t(`${service.id}.title`)}
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {t(`${service.id}.description`)}
          </p>
        </div>

        {/* Footer features */}
        {service.features && service.features.length > 0 && (
          <div className="mt-6 border-t border-border pt-4 space-y-2">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ color: '#00E68B' }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="text-xs text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer platforms */}
        {service.platforms && service.platforms.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3 items-center">
            {service.platforms.map((platform) => {
              const platformIcons: Record<string, string> = {
                iOS: '/device-logos/apple.svg',
                Android: '/device-logos/android.svg',
                Web: '/device-logos/chrome.svg',
                Windows: '/device-logos/microsoft.svg',
                OpenAI: '/ai-logos/openai.svg',
                Claude: '/ai-logos/claude.svg',
                Gemini: '/ai-logos/gemini.svg',
                Mistral: '/ai-logos/mistral.svg',
                Ollama: '/ai-logos/ollama.svg',
                Grok: '/ai-logos/grok.svg',
                DeepSeek: '/ai-logos/deepseek.svg',
                Qwen: '/ai-logos/qwen.svg',
                MiniMax: '/ai-logos/minimax.svg',
                HuggingFace: '/ai-logos/huggingface.svg',
                MCP: '/ai-logos/mcp.svg',
              }

              const iconPath = platformIcons[platform]

              return iconPath ? (
                <img
                  key={platform}
                  src={iconPath}
                  alt={platform}
                  className="w-5 h-5 opacity-70 hover:opacity-100 transition-opacity"
                />
              ) : (
                <span
                  key={platform}
                  className="bg-muted text-muted-foreground text-[10px] px-2 py-1 rounded-sm uppercase"
                >
                  {platform}
                </span>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
