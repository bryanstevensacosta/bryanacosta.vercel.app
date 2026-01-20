/**
 * Property-Based Tests for Textarea Accessibility
 * Feature: contact-section
 * Properties: 9, 12
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import fc from 'fast-check'
import { ValidatedTextarea } from '../ValidatedTextarea'
import { NextIntlClientProvider } from 'next-intl'

// Custom generator for non-empty, non-whitespace strings
const nonEmptyString = (minLength: number, maxLength: number) =>
  fc
    .string({ minLength, maxLength })
    .filter((s) => s.trim().length > 0)
    .map((s) => s.trim())

const messages = {
  validation: {},
}

describe('Property 9: ARIA labels for textarea fields', () => {
  it('should have proper ARIA attributes for any textarea configuration', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: nonEmptyString(1, 20),
          label: nonEmptyString(1, 50),
          required: fc.boolean(),
          rows: fc.integer({ min: 2, max: 10 }),
        }),
        (config) => {
          const { container } = render(
            <NextIntlClientProvider locale="en" messages={messages}>
              <ValidatedTextarea
                name={config.name}
                label={config.label}
                required={config.required}
                rows={config.rows}
                value=""
                onChange={vi.fn()}
              />
            </NextIntlClientProvider>
          )

          const textarea = screen.getByRole('textbox')

          // Should have aria-label
          expect(textarea).toHaveAttribute('aria-label', config.label)

          // Should have aria-required if required
          if (config.required) {
            expect(textarea).toHaveAttribute('aria-required', 'true')
          }

          // Cleanup
          container.remove()
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Property 12: Focus indicators on textarea elements', () => {
  it('should have visible focus styles for any textarea', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: nonEmptyString(1, 20),
          label: nonEmptyString(1, 50),
        }),
        (config) => {
          const { container } = render(
            <NextIntlClientProvider locale="en" messages={messages}>
              <ValidatedTextarea
                name={config.name}
                label={config.label}
                value=""
                onChange={vi.fn()}
              />
            </NextIntlClientProvider>
          )

          const textarea = screen.getByRole('textbox')

          // Check that focus styles are defined in className
          const className = textarea.className
          expect(className).toContain('focus:')

          // Should be focusable
          expect(textarea).not.toHaveAttribute('tabindex', '-1')

          // Cleanup
          container.remove()
        }
      ),
      { numRuns: 100 }
    )
  })
})
