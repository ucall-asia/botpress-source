import { Button } from '@blueprintjs/core'
import React from 'react'
import Tour from 'reactour'
import storage from '../../util/storage'

// Change this key to display the tour the next time a user opens Botpress
const TOUR_KEY = 'guidedTour11_9_0'

export default class GuidedTour extends React.Component {
  componentDidMount() {
    if (!storage.get(TOUR_KEY)) {
      storage.set(TOUR_KEY, true)
      this.props.onToggle()
    }
  }

  componentDidCatch(error) {
    console.log('Error while processing guided tour', error)
  }

  render() {
    const steps = [
      {
        selector: '',
        content: 'Chào mừng tới tới Ucall Builder! Sau đây là hướng dẫn cơ bản về cách sử dụng Ucall Builder để xây dựng kịch bản.'
      },
      {
        selector: '#main',
        content:
          'Màn hình "Flows" là giao diện chính. Sử dụng công cụ này, bạn có thể thiết các phản hồi bằng cách thiết kế các hộp thoại để ấn định nội dung giao tiếp.'
      },
      {
        selector: '#statusbar_emulator',
        content:
          'Sau khi chỉnh sửa kịch bản, ban có thể sử dụng "Giả lập Bot" này để kiểm tra bản chỉnh sửa của bot.'
      },
      {
        selector: '',
        content: 'Chúc mừng bạn đã tìm hiểu hết các tính năng của Ucall Builder. Giờ cùng thử trải nghiệm nào!'
      }
    ]

    return (
      <Tour
        steps={steps}
        isOpen={this.props.isDisplayed}
        onRequestClose={this.props.onToggle}
        lastStepNextButton={<Button>Let's get to work!</Button>}
      />
    )
  }
}
