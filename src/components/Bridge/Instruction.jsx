import React from 'react'
// import Collapsible from 'react-collapsible'
import { instructions } from './data'

const Instruction = (props) => {
  // const { collapse } = props

  // const handleTriggerClick = (e) => {}

  return (
    <div className="instruction">
      <div className="instruction-title">Help</div>
      <div className="border-bottom mb-20" />
      {instructions.map((instruction, index) => {
        return (
          <div key={index}>
            {instruction.title}

            {/* <Collapsible
              handleTriggerClick={handleTriggerClick}
              open={collapse[instruction.name].pending}
              trigger={
                <div
                  className={`${
                    instructions[index + 1] ? 'border-bottom-instruction' : ''
                  } ptb-6 ${
                    collapse[instruction.name].pending ||
                    collapse[instruction.name].success
                      ? ''
                      : 'opacity-5'
                  } ${collapse[instruction.name].success ? 'green-color' : ''}`}
                >
                  {instruction.title}
                </div>
              }
            >
              <div className="content-collapse">{instruction.desc}</div>
            </Collapsible> */}
          </div>
        )
      })}
      <div className="instruction-title mt-20">
        If you need more help visit the{' '}
        <a href="#" className="pink-color">
          wiki
        </a>{' '}
        or watch this step by step{' '}
        <a href="#" className="pink-color">
          explainer video
        </a>
        .
      </div>
    </div>
  )
}

export default Instruction
