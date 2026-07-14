import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Tab, TabList, TabPanel, Tabs } from './Tabs';

afterEach(cleanup);

function renderSettingsTabs(
  props: {
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    value?: string;
  } = {},
): void {
  render(
    <Tabs {...props}>
      <TabList aria-label="Settings sections">
        <Tab value="general">General</Tab>
        <Tab disabled value="appearance">
          Appearance
        </Tab>
        <Tab value="layout">Layout</Tab>
        <Tab value="css">CSS</Tab>
      </TabList>
      <TabPanel value="general">General settings</TabPanel>
      <TabPanel value="appearance">Appearance settings</TabPanel>
      <TabPanel value="layout">Layout settings</TabPanel>
      <TabPanel value="css">CSS settings</TabPanel>
    </Tabs>,
  );
}

describe('Tabs', () => {
  it('selects the first enabled tab by default and links tabs to panels', () => {
    renderSettingsTabs();

    const generalTab = screen.getByRole('tab', { name: 'General' });
    const generalPanel = screen.getByRole('tabpanel', { name: 'General' });

    expect(generalTab.getAttribute('aria-selected')).toBe('true');
    expect(generalTab.getAttribute('tabindex')).toBe('0');
    expect(generalTab.getAttribute('aria-controls')).toBe(generalPanel.id);
    expect(generalPanel.getAttribute('aria-labelledby')).toBe(generalTab.id);
    expect(
      screen.getByRole('tab', { name: 'Appearance' }).getAttribute('tabindex'),
    ).toBe('-1');
  });

  it('reports controlled selection without replacing the controlled value', () => {
    const handleValueChange = vi.fn();

    renderSettingsTabs({
      onValueChange: handleValueChange,
      value: 'general',
    });

    fireEvent.click(screen.getByRole('tab', { name: 'Layout' }));

    expect(handleValueChange).toHaveBeenCalledWith('layout');
    expect(
      screen.getByRole('tab', { name: 'General' }).getAttribute(
        'aria-selected',
      ),
    ).toBe('true');
  });

  it('requests a controlled invalid-value fallback only once', () => {
    const handleValueChange = vi.fn();
    const { rerender } = render(
      <Tabs onValueChange={handleValueChange} value="missing">
        <TabList aria-label="Settings sections">
          <Tab value="general">General</Tab>
          <Tab value="layout">Layout</Tab>
        </TabList>
        <TabPanel value="general">General settings</TabPanel>
        <TabPanel value="layout">Layout settings</TabPanel>
      </Tabs>,
    );

    expect(handleValueChange).toHaveBeenCalledTimes(1);
    expect(handleValueChange).toHaveBeenCalledWith('general');

    rerender(
      <Tabs onValueChange={handleValueChange} value="missing">
        <TabList aria-label="Settings sections">
          <Tab value="general">General</Tab>
          <Tab value="layout">Layout</Tab>
        </TabList>
        <TabPanel value="general">General settings</TabPanel>
        <TabPanel value="layout">Layout settings</TabPanel>
      </Tabs>,
    );

    expect(handleValueChange).toHaveBeenCalledTimes(1);
  });

  it('automatically activates horizontal Arrow, Home, and End targets while skipping disabled tabs', () => {
    renderSettingsTabs({ defaultValue: 'general' });
    const generalTab = screen.getByRole('tab', { name: 'General' });
    const layoutTab = screen.getByRole('tab', { name: 'Layout' });
    const cssTab = screen.getByRole('tab', { name: 'CSS' });

    generalTab.focus();
    fireEvent.keyDown(generalTab, { key: 'ArrowRight' });

    expect(document.activeElement).toBe(layoutTab);
    expect(layoutTab.getAttribute('aria-selected')).toBe('true');
    expect(
      screen.getByRole('tabpanel', { name: 'Layout' }).hidden,
    ).toBe(false);

    fireEvent.keyDown(layoutTab, { key: 'End' });
    expect(document.activeElement).toBe(cssTab);
    expect(cssTab.getAttribute('aria-selected')).toBe('true');

    fireEvent.keyDown(cssTab, { key: 'Home' });
    expect(document.activeElement).toBe(generalTab);
    expect(generalTab.getAttribute('aria-selected')).toBe('true');
  });

  it('uses vertical Arrow keys and wraps through enabled tabs', () => {
    renderSettingsTabs({ defaultValue: 'general', orientation: 'vertical' });
    const tabList = screen.getByRole('tablist', {
      name: 'Settings sections',
    });
    const generalTab = screen.getByRole('tab', { name: 'General' });
    const cssTab = screen.getByRole('tab', { name: 'CSS' });

    generalTab.focus();
    fireEvent.keyDown(generalTab, { key: 'ArrowUp' });

    expect(tabList.getAttribute('aria-orientation')).toBe('vertical');
    expect(document.activeElement).toBe(cssTab);
    expect(cssTab.getAttribute('aria-selected')).toBe('true');
  });

  it('falls back to the first enabled tab when the initial value is unavailable', () => {
    renderSettingsTabs({ defaultValue: 'appearance' });

    const generalTab = screen.getByRole('tab', { name: 'General' });

    expect(generalTab.getAttribute('aria-selected')).toBe('true');
    expect(generalTab.getAttribute('tabindex')).toBe('0');
    expect(
      screen.getByRole('tabpanel', { name: 'General' }).hidden,
    ).toBe(false);
  });
});
