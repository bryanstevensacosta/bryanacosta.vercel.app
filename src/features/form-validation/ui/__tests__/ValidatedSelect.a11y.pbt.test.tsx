/**
 * Property-Based Tests for Select Accessibility
 * Feature: contact-section
 * Properties: 9, 12
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import fc from 'fast-check'
import { ValidatedSelect } from '../ValidatedSelect'
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

describe('Property 9: ARIA labels for select fields', () => {
  it('should have proper ARIA attributes for any select configuration', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: nonEmptyString(1, 20),
          label: nonEmptyString(1, 50),
          required: fc.boolean(),
          options: fc
            .array(
              fc.record({
                value: nonEmptyString(1, 20),
                label: nonEmptyString(1, 50),
              }),
              { minLength: 1, maxLength: 5 }
            )
            .filter(
              (opts) => new Set(opts.map((o) => o.value)).size === opts.length
            ),
        }),
        (config) => {
          const { container } = render(
            <NextIntlClientProvider locale="en" messages={messages}>
              <ValidatedSelect
                name={config.name}
                label={config.label}
                required={config.required}
                options={config.options}
                value=""
                onChange={vi.fn()}
              />
            </NextIntlClientProvider>
          )

          const select = screen.getByRole('combobox')

          // Should have aria-label
          expect(select).toHaveAttribute('aria-label', config.label)

          // Should have aria-required if required
          if (config.required) {
            expect(select).toHaveAttribute('aria-required', 'true')
          }

          // Cleanup
          container.remove()
        }
      ),
      { numRuns: 100 }
    )
  })
})

describe('Property 12: Focus indicators on select elements', () => {
  it('should have visible focus styles for any select', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: nonEmptyString(1, 20),
          label: nonEmptyString(1, 50),
        }),
        (config) => {
          const { container } = render(
            <NextIntlClientProvider locale="en" messages={messages}>
              <ValidatedSelect
                name={config.name}
                label={config.label}
                options={[
                  { value: 'opt1', label: 'Option 1' },
                  { value: 'opt2', label: 'Option 2' },
                ]}
                value=""
                onChange={vi.fn()}
              />
            </NextIntlClientProvider>
          )

          const select = screen.getByRole('combobox')

          // Check that focus styles are defined in className
          const className = select.className
          expect(className).toContain('focus:')

          // Should be focusable
          expect(select).not.toHaveAttribute('tabindex', '-1')

          // Cleanup
          container.remove()
        }
      ),
      { numRuns: 100 }
    )
  })
})
