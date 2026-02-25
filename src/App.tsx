import type { FC } from 'react';
import {
  TopBar,
  ContextHeader,
  PrimaryWorkspace,
  SecondaryPanel,
  ProofFooter,
} from './components/layout';
import {
  Button,
  Card,
  InputGroup,
  PanelCard,
  PromptBox,
} from './components/ui';
import {
  Alert,
  EmptyState,
} from './components/feedback';
import './styles/design-system.css';
import './styles/components.css';
import './styles/layout.css';

const App: FC = () => {
  return (
    <div className="app">
      <TopBar
        currentStep={2}
        totalSteps={5}
        status="in-progress"
      />
      
      <ContextHeader
        title="Design System Foundation"
        subtitle="A calm, intentional foundation for building the Job Notification App."
      />
      
      <div className="main-content">
        <PrimaryWorkspace>
          {/* Component Showcase */}
          <Card title="Buttons">
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', gap: '16px' }}>
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </Card>

          <Card title="Form Inputs">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <InputGroup
                label="Email Address"
                name="email"
                hint="We'll never share your email."
                inputProps={{
                  type: 'email',
                  placeholder: 'you@example.com',
                }}
              />
              <InputGroup
                label="Company"
                name="company"
                error="Company name is required"
                inputProps={{
                  type: 'text',
                  placeholder: 'Acme Inc.',
                }}
              />
            </div>
          </Card>

          <Card title="Alerts & Feedback">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <Alert variant="error" title="Connection failed">
                Unable to connect to the server. Please check your internet connection and try again.
              </Alert>
              <Alert variant="warning" title="Unsaved changes">
                You have unsaved changes. Make sure to save before leaving.
              </Alert>
              <Alert variant="success" title="Profile updated">
                Your profile has been successfully updated.
              </Alert>
            </div>
          </Card>

          <Card title="Empty State">
            <EmptyState
              title="No notifications yet"
              description="Set up your job preferences to start receiving relevant notifications."
              actionLabel="Configure Preferences"
              onAction={() => console.log('Configure clicked')}
            />
          </Card>
        </PrimaryWorkspace>

        <SecondaryPanel>
          <PanelCard title="About This Design System">
            <p>
              This design system follows a calm, intentional philosophy. 
              No gradients, no glassmorphism, no neon colors. Just clean, 
              confident design that puts content first.
            </p>
          </PanelCard>

          <PanelCard title="Color System">
            <p style={{ marginBottom: '16px' }}>
              Maximum 4 colors across the entire UI:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#F7F6F3', border: '1px solid #ddd', borderRadius: '4px' }} />
                <span style={{ fontSize: '14px' }}>Background: #F7F6F3</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#111111', borderRadius: '4px' }} />
                <span style={{ fontSize: '14px' }}>Text: #111111</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#8B0000', borderRadius: '4px' }} />
                <span style={{ fontSize: '14px' }}>Accent: #8B0000</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', backgroundColor: '#4A7C59', borderRadius: '4px' }} />
                <span style={{ fontSize: '14px' }}>Success: #4A7C59</span>
              </div>
            </div>
          </PanelCard>

          <PanelCard title="Sample Prompt">
            <PromptBox code={`Create a new job alert for:
- Role: Senior Frontend Engineer
- Location: Remote
- Keywords: React, TypeScript`} />
          </PanelCard>

          <div style={{ marginTop: '16px' }}>
            <Button variant="primary" style={{ width: '100%' }}>
              Save Configuration
            </Button>
          </div>
        </SecondaryPanel>
      </div>

      <ProofFooter
        items={[
          { label: 'UI Built', completed: true },
          { label: 'Logic Working', completed: true },
          { label: 'Test Passed', completed: false },
          { label: 'Deployed', completed: false },
        ]}
      />
    </div>
  );
}

export default App;
